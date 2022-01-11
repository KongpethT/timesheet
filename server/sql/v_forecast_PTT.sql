CREATE OR REPLACE VIEW v_forecast_PTT AS 
SELECT
    forecast.id,
    forecast.account_id,
    ACCOUNT.fullName AS account_name,
    agency.name AS name_of_agency,
    CLIENT.name AS name_of_client,
    client_type.name AS name_of_client_type,
    process.name AS process_name,
    forecast.ptt_weekly_update,
    forecast.remark,
    forecast.potential,
    FORMAT(forecast.PTT1, 0) AS PTT1,
    FORMAT(forecast.PTT2, 0) AS PTT2,
    FORMAT(forecast.PTT3, 0) AS PTT3,
    FORMAT(forecast.PTT4, 0) AS PTT4,
    FORMAT(forecast.PTT5, 0) AS PTT5,
    FORMAT(forecast.PTT6, 0) AS PTT6,
    FORMAT(forecast.PTT7, 0) AS PTT7,
    FORMAT(forecast.PTT8, 0) AS PTT8,
    FORMAT(forecast.PTT9, 0) AS PTT9,
    FORMAT(forecast.PTT10, 0) AS PTT10,
    FORMAT(forecast.PTT11, 0) AS PTT11,
    FORMAT(forecast.PTT12, 0) AS PTT12,
    forecast.year,
    process.id AS process_id
FROM
    forecast,
    ACCOUNT,
    agency,
    CLIENT,
    client_type,
    process
WHERE
    forecast.agency_id = agency.id AND forecast.client_id = CLIENT.id AND forecast.account_id = ACCOUNT.id AND forecast.client_type_id = client_type.id AND forecast.process_id = process.id