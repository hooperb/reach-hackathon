import { models } from "database";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const user = await models.UserModel.create({ name: req.body.name });

    res.json(user);
  } catch (err) {
    // TODO: replace with stackdriver logging
    console.error(err);
    res.status(500).json(err);
  }
};
