import _ from 'lodash';

import { BigNumber, ethers as Ethers } from "ethers";

import { ethers } from 'hardhat';

import { Treasury } from '../../typechain/Treasury';
import { CrecTransfer } from '../../typechain/CrecTransfer';
import { CrecTransfer__factory } from '../../typechain/factories/CrecTransfer__factory';
import { Treasury__factory } from '../../typechain/factories/Treasury__factory';

const STARTING_WEIGHT = ethers.utils.parseEther('10');

export async function deployCrecTransfer(signer: Ethers.Signer, treasury: Treasury, options: any = {}): Promise<CrecTransfer> {

    // get balance of treasury for weth
    let targetTreasuryBalance = options.targetTreasuryBalance;

    if(!targetTreasuryBalance) {
        // assume the target is whatever is in the inherited treasury
        targetTreasuryBalance = await treasury.getTreasuryBalance();
    }

    const crecTransfer = await new CrecTransfer__factory(signer).deploy(treasury.address, options.targetInterval || ethers.BigNumber.from(600), targetTreasuryBalance, {
        gasLimit: 1800000 
    });

    await crecTransfer.deployed();

    const txn = await treasury.setController(crecTransfer.address);
    await txn.wait(1);

    return crecTransfer;
}

export async function addAuthorizedToken(crec: CrecTransfer, token: string) {
    return await crec.addAuthorizedToken(token,ethers.utils.parseEther('1'));
}


if(module == require.main) {

    // convert flags to data
    (async () => {

        const signer = (await ethers.getSigners())[0];

        const treasuryAddress = process.env.TREASURY!;

        if(!treasuryAddress) {
            console.error('Treasury address not specified');
            return;
        }

        const crec = await deployCrecTransfer(signer, Treasury__factory.connect(treasuryAddress, signer));

        console.log('deployed crescendo transfer:', crec.address);

        for(const token of (process.env.TOKENS || '').split(',')) {
            const t = await addAuthorizedToken(crec, token);
            const r = await t.wait();

            console.log('authorized token', token, r.transactionHash);
        }
    })();
}