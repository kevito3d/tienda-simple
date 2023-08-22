import Sale from "../models/sale.model";
// import cryto
import crypto from "node:crypto";

export const create = async (req, res) => {
    try {
        const { total } = req.body;
        const sale = await Sale.create({
            id: crypto.randomUUID(),
            username: req.username,
            total
        });
        res.json(sale);
      } catch (error) {
        res.status(500).json({
          message: "ALGO SALIO MAL",
        });
      }
}

export const findAll = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            attributes: ['id', 'total'],
            where: {
                username: req.username
            }
        });
        res.json(sales);
      } catch (error) {
        res.status(500).json({
          message: "ALGO SALIO MAL",
        });
      }
}
