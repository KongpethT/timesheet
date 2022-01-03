CREATE OR REPLACE VIEW v_forecast AS SELECT
    forecast.id,
    forecast.account_id,
    ACCOUNT.fullName AS account_name,
    agency.name AS name_of_agency,
    CLIENT.name AS name_of_client,
    forecast.SGD1,
    forecast.RCC1,
    forecast.PTT1,
    forecast.SGD2,
    forecast.RCC2,
    forecast.PTT2,
    forecast.SGD3,
    forecast.RCC3,
    forecast.PTT3,
    forecast.SGD4,
    forecast.RCC4,
    forecast.PTT4,
    forecast.SGD5,
    forecast.RCC5,
    forecast.PTT5,
    forecast.SGD6,
    forecast.RCC6,
    forecast.PTT6,
    forecast.SGD7,
    forecast.RCC7,
    forecast.PTT7,
    forecast.SGD8,
    forecast.RCC8,
    forecast.PTT8,
    forecast.SGD9,
    forecast.RCC9,
    forecast.PTT9,
    forecast.SGD10,
    forecast.RCC10,
    forecast.PTT10,
    forecast.SGD11,
    forecast.RCC11,
    forecast.PTT11,
    forecast.SGD12,
    forecast.RCC12,
    forecast.PTT12
FROM
    forecast,
    ACCOUNT,
    agency,
    CLIENT
WHERE
    forecast.agency_id = agency.id AND forecast.client_id = CLIENT.id AND forecast.account_id = ACCOUNT.id