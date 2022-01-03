CREATE OR REPLACE VIEW v_agency_client AS SELECT account.id as accountOfId,
    agency.id AS agencyOfId,
    agency.name AS nameOfAgency,
    CLIENT.id AS clientOfId,
    CLIENT.name AS nameOfClient
FROM CLIENT
    ,
    ACCOUNT,
    agency
WHERE ACCOUNT
    .id = agency.account_id AND agency.id = CLIENT.agency_id