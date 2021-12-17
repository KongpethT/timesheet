exports.count_activity = (req, res) => {
    const id = req.params.code
    let event_where
    (id !== 'all') ? event_where = `where userCode ="${id}"` : null

    conn.query('select sum(visitCall) as visitCall, '
        + 'sum(visitAM) as visitAM, '
        + 'sum(visitPM) as visitPM, '
        + 'sum(siteTourAM) as siteTourAM, '
        + 'sum(siteTourPM) as siteTourPM, '
        + 'sum(lunch) as lunch, '
        + 'sum(dinner) as dinner, '
        + 'count(others) as other, '
        + 'count(id) as summary_rows '
        + 'from timeline '
        + event_where,
        (error, result) => {
            if (error) throw res.send(error)
            res.send(result)
        })
}
////