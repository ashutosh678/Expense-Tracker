import { Router } from "express";
import {
	getExpenses,
	addExpense,
	updateExpense,
	deleteExpense,
} from "../controllers/expenseController";

const router = Router();

router.route("/").get(getExpenses).post(addExpense);

router.route("/:id").put(updateExpense).delete(deleteExpense);

export default router;
