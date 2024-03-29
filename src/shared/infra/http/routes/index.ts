import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/user.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/provider.routes';

const routes = Router();

routes.use('/appointments',appointmentsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/password', passwordRoutes)
routes.use('/profile', profileRoutes)
routes.use('/providers', providersRouter)

export default routes;
