const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  // const waveContract = await waveContractFactory.deploy();
  // await waveContract.deployed();
  const waveContract = await hre.ethers.deployContract("WavePortal");

  console.log("Contract deployed to:", waveContract.target);
  console.log("Contract deployed by:", owner.address);

  await waveContract.getTotalWaves();

  const firstWaveTxn = await waveContract.wave();
  await firstWaveTxn.wait();

  await waveContract.getTotalWaves();

  const secondWaveTxn = await waveContract.connect(randomPerson).wave();
  await secondWaveTxn.wait();

  await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
