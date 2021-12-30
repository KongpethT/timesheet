CREATE OR REPLACE VIEW v_timeline AS SELECT
    timeline.id,
    timeline.account_id,
    ACCOUNT.fullName AS account_name,
    DATE_FORMAT(timeline.date, "%Y-%m-%d") as date,
    CLIENT.name AS name_of_client,
    agency.name AS name_of_agency,
    client_type.name AS client_type,
    timeline.visit_call,
    timeline.visit_AM,
    timeline.visit_PM,
    timeline.site_tour_AM,
    timeline.site_tour_PM,
    timeline.lunch,
    timeline.dinner,
    timeline.others
FROM
    timeline,
    ACCOUNT,
    agency,
    CLIENT,
    client_type
WHERE
    timeline.account_id = ACCOUNT.id AND timeline.client_id = CLIENT.id AND timeline.agency_id = agency.id AND timeline.client_type_id = client_type.id