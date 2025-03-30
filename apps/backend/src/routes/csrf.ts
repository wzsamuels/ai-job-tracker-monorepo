// This route generates a CSRF token and sends it to the client. The client should include this token in the headers of any state-changing requests (like POST, PUT, DELETE) to protect against CSRF attacks. The server will validate the token before processing the request.

import { Router } from 'express';
import { generateCsrfToken } from '../middlewares/csrf';

const router = Router();

router.get('/api/csrf-token', generateCsrfToken);

export default router;
