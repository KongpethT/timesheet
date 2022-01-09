CREATE OR REPLACE VIEW v_forecast_PTT_count AS 
SELECT
    forecast.id,
    forecast.account_id,
    ACCOUNT.fullName AS account_name,
    agency.name AS name_of_agency,
    CLIENT.name AS name_of_client,
    client_type.name as name_of_client_type,
    process.name as process_name,
    forecast.ptt_weekly_update,
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