import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
    constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

    handle(request: Request, response: Response): Response {
        const { user_id } = request.params;

        try {
            const user = this.turnUserAdminUseCase.execute({ user_id });
            return response.status(200).json(user);
        } catch (err) {
            if (String(err.message).includes("User not found")) {
                return response.status(404).json({ error: err.message });
            }
            return response.status(400).json({
                error: err.message,
            });
        }
    }
}

export { TurnUserAdminController };
