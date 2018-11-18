
//Cambiar estado
(req, res) => {
    const { identification } = req.params;
    const query = 'CALL sp_state_update (?)';
    mysqlConnection.query(query, [identification], (err, rows, fields) => {
        if (!err) {
            const states = rows;

            if (states.affectedRows == 0)
                return res.json({ Status: false });

            return res.json({ Status: true });

        } else {
            res.json({ err });
        }
    });
});