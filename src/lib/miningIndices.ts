import { MiningIndex } from "~/src/types";

export const miningIndices: MiningIndex[] = [
  {
    symbol: "HUI",
    symbols: "AEM,AGI,AU,GOLD,BVN,EGO,GFI,GG,HMY,KGC,NGD,NEM,SBSW,AUY",
    about:
      "The AMEX Gold BUGS(Basket of Unhedged Gold Stocks)Index represents a portfolio of 14 major gold mining companies.The Index is designed to give investors significant exposure to near term movements in gold prices - by including companies that do not hedge their gold production beyond 1 1/2 years.",
  },
  {
    symbol: "XAU",
    symbols:
      "AEM,AU,GOLD,CDE,BVN,EGO,AG,FCX,GFI,GORO,GG,HMY,HL,AIG,KGC,MUX,NGD,NEM,NG,PAAS,RGLD,SAND,SA,SSRI,SWC,WPM,AUY",
    about:
      "The XAU is an index traded on the Philadelphia exchange. It consists of 27 precious metal mining companies. Those companies and their current share prices are listed below.",
  },
  {
    symbol: "JSE",
    symbols: "ANG,DRD,GFIJ,HAR,SSWJ",
    about:
      "The JSE (Johannesburg Stock Exchange) provides a marketplace for the shares of South Africa's mining companies amongst others. The JSE Gold index consists of 5 precious metal mining companies which are listed below.",
  },
  {
    symbol: "TSX",
    symbols:
      "ABN.VN,AEM,ASR.TO,AGI,AORO.VN,AGC.VN,LI.VN,AU,AGD.VN,AR.TO,AGZ.VN,BTO.TO,ABX.TO,BBB.VN,CBR.VN,CG.TO,CGG.TO,BVN,CNL.TO,CGP.VN,KOR.TO,DGC.TO,MDCMC.VN,ELD.TO,ELE.VN,EMX.VN,EQX.TO,ERD.TO,FWZ.VN,FF.TO,FVI.TO,FSX.VN,FNV.TO,FURY.TO,GAU.TO,GWM.VN,GIS.VN,GFI,YGT.VN,G.TO,GOLD.TO,GBR.VN,ZNG.VN,HMY,IMG.TO,KRR.TO,K.TO,KL.TO,KG.VN,KTN.VN,KORE.VN,LMC.TO,MGM.VN,MOZ.TO,MENE.VN,MTA.VN,MAX.TO,MRO.TO,MQR.VN,NCU.TO,NGE.VN,NAM.VN,NGD.TO,NEM,NGT.TO,NRG.VN,NM.VN,NEE.VN,NG.TO,OGC.TO,ORE.VNOR.TO,OS.VN,PG.TO,PVG.TO,PRB.VN,RDS.VN,RVG.VN,RGLD,RMX.TO,SSL.TO,SA,SMF.TO,SBSW,SIL.VN,PEAK.VN,THO.TO,TXG.TO,VTT.VN,VRR.VN,WVM.VN,WPM.TO,WGO.VN,YRI.TO,",
    about:
      "The S&P TSX Gold Index consists of 94 precious metal mining companies traded on the Toronto Stock Exchange (TSX). Those companies and their current share prices are listed below.",
  },
];

export const allSymbols =
  miningIndices[0].symbols +
  miningIndices[1].symbols +
  miningIndices[2].symbols +
  miningIndices[3].symbols +
  "ASM,EOM,EOM.CN,SVM";
