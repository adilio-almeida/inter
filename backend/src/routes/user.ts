const express = require('express');
const db = require('../module/dbConnect');

const getUsers = (req: any, res: any) => {
  db.query(
    'SELECT * FROM "Tables".users ORDER BY id ASC',
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
};

module.exports = {
  getUsers,
};
