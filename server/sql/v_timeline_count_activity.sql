CREATE OR REPLACE VIEW v_timeline_count_activity AS SELECT
    sum(visit_call) AS count_call,
    sum(visit_AM) AS count_visit_am,
    sum(visit_PM) AS count_visit_pm,
    sum(site_tour_AM) AS count_site_tour_am,
    sum(site_tour_PM) AS count_site_tour_pm,
    sum(lunch) AS count_lunch,
    sum(dinner) AS count_dinner,
    COUNT(others) AS count_other
FROM
    `timeline`
WHERE
    1