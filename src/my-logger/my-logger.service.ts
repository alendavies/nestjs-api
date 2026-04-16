import { ConsoleLogger, Injectable } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry) {
        const textEntry =
            typeof entry === 'string'
                ? entry
                : entry instanceof Error
                  ? (entry.stack ?? entry.message)
                  : (() => {
                        try {
                            return JSON.stringify(entry);
                        } catch {
                            return String(entry);
                        }
                    })();

        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Chicago',
        }).format(new Date())}\t${textEntry}\n`;

        const logsDir = path.join(process.cwd(), 'logs');
        const filePath = path.join(logsDir, 'myLogFile.log');

        try {
            await fsPromises.mkdir(logsDir, { recursive: true });

            await fsPromises.appendFile(filePath, formattedEntry, 'utf8');
        } catch (e) {
            console.error(`Failed to write log file (${filePath}):`, e);
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        void this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        void this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
