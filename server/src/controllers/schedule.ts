import { Request, Response } from "express";

import {
  createSchedule,
  deleteScheduleByID,
  getAllSchedules,
  getScheduleByID,
  updateScheduleByID,
} from "../db/schedules";
import { createPresentation } from "../db/presentations";

// get all schedules
export const getSchedules = async (_req: Request, res: Response) => {
  try {
    const data = await getAllSchedules();
    return res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// create new schedule
export const createNewSchedule = async (req: Request, res: Response) => {
  const { dateAndTime, location, panelists, researches } = req.body;

  const result = await createSchedule({
    dateAndTime,
    location,
    panelists,
    researches,
  });

  researches.forEach(async (research: any) => {
    await createPresentation({
      researchID: research,
      scheduleID: result._id,
      status: "Pending",
    });
  });

  res.status(200).end();
};

// fetch a schedule
export const fetchSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getScheduleByID(id);

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// update a schedule
export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { dateAndTime, location, panelists, researches } = req.body;
    const schedule = await getScheduleByID(id);

    if (dateAndTime) schedule.dateAndTime = dateAndTime;
    if (location) schedule.location = location;
    if (panelists) schedule.panelists = panelists;
    if (researches) schedule.researches = researches;

    await schedule.save();
    await updateScheduleByID(id, schedule);

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// delete a schedule
export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteScheduleByID(id);

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
