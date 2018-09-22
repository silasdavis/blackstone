const boom = require('boom');
const {
  format,
  asyncMiddleware,
} = require(`${global.__common}/controller-dependencies`);
const sqlCache = require('./sqlsol-query-helper');

module.exports = {
  getCountries: asyncMiddleware(async (req, res) => {
    const countries = [];
    const data = await sqlCache.getCountries();
    data.forEach((elem) => {
      countries.push(format('Country', elem));
    });
    return res.status(200).json(countries);
  }),

  getAlpha2Countries: asyncMiddleware(async (req, res) => {
    if (!req.params.alpha2) throw boom.badRequest('Country alpha2 identifier required');
    const { alpha2 } = req.params;
    const data = await sqlCache.getCountryByAlpha2Code(alpha2);
    return res.status(200).json(format('Country', data));
  }),

  getAlpha2CountryRegions: asyncMiddleware(async (req, res) => {
    const regions = [];
    if (!req.params.alpha2) throw boom.badRequest('Country alpha2 identifier required');
    const { alpha2 } = req.params;
    const data = await sqlCache.getRegionsOfCountry(alpha2);
    data.forEach((elem) => {
      regions.push(format('Region', elem));
    });
    return res.status(200).json(regions);
  }),

  getCurrencies: asyncMiddleware(async (req, res) => {
    const currencies = [];
    const data = await sqlCache.getCurrencies();
    data.forEach((elem) => {
      currencies.push(format('Currency', elem));
    });
    return res.status(200).json(currencies);
  }),

  getAlpha3Currencies: asyncMiddleware(async (req, res) => {
    if (!req.params.alpha3) throw boom.badRequest('Currency alpha3 identifier required');
    const { alpha3 } = req.params;
    const data = await sqlCache.getCurrencyByAlpha3Code(alpha3);
    return res.status(200).json(format('Currency', data[0]));
  }),

  getParameterType: asyncMiddleware(async (req, res) => {
    if (!req.params.id) throw boom.badRequest('Parameter id is required');
    const data = await sqlCache.getParameterType(req.params.id);
    return res.status(200).json(format('ParameterType', data));
  }),

  getParameterTypes: asyncMiddleware(async (req, res) => {
    const parameters = [];
    const data = await sqlCache.getParameterTypes();
    data.forEach((elem) => {
      parameters.push(format('ParameterType', elem));
    });
    return res.status(200).json(parameters);
  }),

  getCollectionTypes: asyncMiddleware((req, res) => {
    const collectionTypes = [{
      collectionType: 0,
      label: 'Case',
    },
    {
      collectionType: 1,
      label: 'Deal',
    },
    {
      collectionType: 2,
      label: 'Dossier',
    },
    {
      collectionType: 3,
      label: 'Folder',
    },
    {
      collectionType: 4,
      label: 'Matter',
    },
    {
      collectionType: 5,
      label: 'Package',
    },
    {
      collectionType: 6,
      label: 'Project',
    },
    ];
    return res.status(200).json(collectionTypes);
  }),

};
