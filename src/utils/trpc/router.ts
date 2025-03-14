import t from "./context";
import { authRouter } from "./routes/authRoutes";
import { csrfRoutes } from "./routes/csrfRoutes";
import { settingsRouter } from "./routes/settingsRouter";
import { stripeRouter } from "./routes/stripeRoutes";

export const appRouter = t.router({
    auth:       authRouter,
    stripe:     stripeRouter,
    settings:   settingsRouter,
    csrf:       csrfRoutes
});

export type AppRouter = typeof appRouter;