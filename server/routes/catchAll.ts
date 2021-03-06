import { Router } from './_transRouter';
import { Job } from '../models/job';
import { upMonitor } from '../upmonitor';

const router = new Router();
router.get('/', async ctx => {
    // log(`New call to catch all, server is down: ${upMonitor.isDown}, because ${upMonitor.reason}.`);
    if (upMonitor.isDown) {
        log(`Server is down because of ${upMonitor.reason}, not trying to go the database.`);
        await ctx.render('index', { jobs: null, isDown: true });
        return;
    } else {
        const jobs = await Job.find();
        await ctx.render('index', { jobs: jobs });
    }
});
export default router;