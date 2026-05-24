export const DATASET_CATEGORIES = {
  economics: [
    {
      id: "gdp-current-usd",
      title: "GDP (Current US$)",
      indicator: "NY.GDP.MKTP.CD",
    },

    {
      id: "gdp-growth",
      title: "GDP Growth (Annual %)",
      indicator: "NY.GDP.MKTP.KD.ZG",
    },

    {
      id: "gdp-per-capita",
      title: "GDP Per Capita",
      indicator: "NY.GDP.PCAP.CD",
    },

    {
      id: "unemployment-rate",
      title: "Unemployment Rate",
      indicator: "SL.UEM.TOTL.ZS",
    },

    {
      id: "trade-percent-gdp",
      title: "Trade (% of GDP)",
      indicator: "NE.TRD.GNFS.ZS",
    },

    {
      id: "gross-savings",
      title: "Gross Domestic Savings",
      indicator: "NY.GDS.TOTL.ZS",
    },
  ],

  finance: [
    {
      id: "inflation-consumer-prices",
      title: "Inflation, Consumer Prices",
      indicator: "FP.CPI.TOTL.ZG",
    },

    {
      id: "real-interest-rate",
      title: "Real Interest Rate",
      indicator: "FR.INR.RINR",
    },

    {
      id: "domestic-credit-private-sector",
      title: "Domestic Credit to Private Sector",
      indicator: "FS.AST.PRVT.GD.ZS",
    },

    {
      id: "broad-money-growth",
      title: "Broad Money Growth",
      indicator: "FM.LBL.BMNY.ZG",
    },

    {
      id: "external-debt",
      title: "External Debt Stocks",
      indicator: "DT.DOD.DECT.CD",
    },

    {
      id: "official-exchange-rate",
      title: "Official Exchange Rate",
      indicator: "PA.NUS.FCRF",
    },
  ],

  population: [
    {
      id: "total-population",
      title: "Total Population",
      indicator: "SP.POP.TOTL",
    },

    {
      id: "population-growth",
      title: "Population Growth",
      indicator: "SP.POP.GROW",
    },

    {
      id: "urban-population",
      title: "Urban Population",
      indicator: "SP.URB.TOTL",
    },

    {
      id: "rural-population",
      title: "Rural Population",
      indicator: "SP.RUR.TOTL",
    },

    {
      id: "birth-rate",
      title: "Birth Rate",
      indicator: "SP.DYN.CBRT.IN",
    },

    {
      id: "death-rate",
      title: "Death Rate",
      indicator: "SP.DYN.CDRT.IN",
    },
  ],

  education: [
    {
      id: "adult-literacy-rate",
      title: "Adult Literacy Rate",
      indicator: "SE.ADT.LITR.ZS",
    },

    {
      id: "primary-school-enrollment",
      title: "Primary School Enrollment",
      indicator: "SE.PRM.ENRR",
    },

    {
      id: "secondary-school-enrollment",
      title: "Secondary School Enrollment",
      indicator: "SE.SEC.ENRR",
    },

    {
      id: "tertiary-school-enrollment",
      title: "Tertiary School Enrollment",
      indicator: "SE.TER.ENRR",
    },

    {
      id: "government-education-spending",
      title: "Government Expenditure on Education",
      indicator: "SE.XPD.TOTL.GD.ZS",
    },

    {
      id: "primary-completion-rate",
      title: "Primary Completion Rate",
      indicator: "SE.PRM.CMPT.ZS",
    },
  ],

  health: [
    {
      id: "life-expectancy",
      title: "Life Expectancy at Birth",
      indicator: "SP.DYN.LE00.IN",
    },

    {
      id: "infant-mortality-rate",
      title: "Infant Mortality Rate",
      indicator: "SP.DYN.IMRT.IN",
    },

    {
      id: "health-expenditure-percent-gdp",
      title: "Health Expenditure (% GDP)",
      indicator: "SH.XPD.CHEX.GD.ZS",
    },

    {
      id: "hospital-beds",
      title: "Hospital Beds per 1,000 People",
      indicator: "SH.MED.BEDS.ZS",
    },

    {
      id: "physicians-per-1000",
      title: "Physicians per 1,000 People",
      indicator: "SH.MED.PHYS.ZS",
    },

    {
      id: "immunization-rate",
      title: "Immunization Rate",
      indicator: "SH.IMM.MEAS",
    },
  ],

  agriculture: [
    {
      id: "agricultural-land",
      title: "Agricultural Land (% of Land Area)",
      indicator: "AG.LND.AGRI.ZS",
    },

    {
      id: "forest-area",
      title: "Forest Area (% of Land Area)",
      indicator: "AG.LND.FRST.ZS",
    },

    {
      id: "cereal-yield",
      title: "Cereal Yield",
      indicator: "AG.YLD.CREL.KG",
    },

    {
      id: "food-production-index",
      title: "Food Production Index",
      indicator: "AG.PRD.FOOD.XD",
    },

    {
      id: "agriculture-value-added",
      title: "Agriculture Value Added (% GDP)",
      indicator: "NV.AGR.TOTL.ZS",
    },

    {
      id: "rural-population-agriculture",
      title: "Rural Population",
      indicator: "SP.RUR.TOTL",
    },
  ],

  climate: [
    {
      id: "co2-emissions",
      title: "CO2 Emissions per Capita",
      indicator: "EN.ATM.CO2E.PC",
    },

    {
      id: "methane-emissions",
      title: "Methane Emissions",
      indicator: "EN.ATM.METH.KT.CE",
    },

    {
      id: "renewable-energy-consumption",
      title: "Renewable Energy Consumption",
      indicator: "EG.FEC.RNEW.ZS",
    },

    {
      id: "electric-power-consumption",
      title: "Electric Power Consumption",
      indicator: "EG.USE.ELEC.KH.PC",
    },

    {
      id: "forest-area-percent",
      title: "Forest Area (% of Land Area)",
      indicator: "AG.LND.FRST.ZS",
    },

    {
      id: "access-clean-fuels",
      title: "Access to Clean Fuels",
      indicator: "EG.CFT.ACCS.ZS",
    },
  ],
};

export const COUNTRIES = [
  { code: "nga", name: "Nigeria" },
  { code: "usa", name: "United States" },
  { code: "gbr", name: "United Kingdom" },
  { code: "bra", name: "Brazil" },
  { code: "ind", name: "India" },
  { code: "chn", name: "China" },
  { code: "zaf", name: "South Africa" },
  { code: "ken", name: "Kenya" },
  { code: "fra", name: "France" },
  { code: "deu", name: "Germany" },
];
