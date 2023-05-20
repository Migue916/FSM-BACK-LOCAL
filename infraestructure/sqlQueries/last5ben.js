const getLatestBeneficiariosQuery = 'SELECT * ' +
                                    'FROM BENEFICIARIO ' +
                                    'ORDER BY fecha_ingreso DESC ' +
                                    'LIMIT 5;';

module.exports = { getLatestBeneficiariosQuery };