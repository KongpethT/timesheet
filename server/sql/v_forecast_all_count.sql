CREATE OR REPLACE VIEW v_forecast_all_count AS 
SELECT
    forecast.id,
    forecast.account_id,
    ACCOUNT.fullName AS account_name,
    agency.name AS name_of_agency,
    CLIENT.name AS name_of_client,
    client_type.name as name_of_client_type,
    process.name as process_name,
    forecast.ptt_weekly_update,
    forecast.SGD1,
    forecast.SGD2,
    forecast.SGD3,
    forecast.SGD4,
    forecast.SGD5,
    forecast.SGD6,
    forecast.SGD7,
    forecast.SGD8,
    forecast.SGD9,
    forecast.SGD10,
    forecast.SGD11,
    forecast.SGD12,
    forecast.RCC1,
    forecast.RCC2,
    forecast.RCC3,
    forecast.RCC4,
    forecast.RCC5,
    forecast.RCC6,
    forecast.RCC7,
    forecast.RCC8,
    forecast.RCC9,
    forecast.RCC10,
    forecast.RCC11,
    forecast.RCC12,
    forecast.PTT1,
    forecast.PTT2,
    forecast.PTT3,
    forecast.PTT4,
    forecast.PTT5,
    forecast.PTT6,
    forecast.PTT7,
    forecast.PTT8,
    forecast.PTT9,
    forecast.PTT10,
    forecast.PTT11,
    forecast.PTT12,
    forecast.year
FROM
    forecast,
    ACCOUNT,
    agency,
    CLIENT,
    client_type,
    process
WHERE
    forecast.agency_id = agency.id AND forecast.client_id = CLIENT.id AND forecast.account_id = ACCOUNT.id
    and  forecast.client_type_id = client_type.id and forecast.process_id = process.id