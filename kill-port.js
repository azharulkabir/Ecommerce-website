// Helper script to kill process on port 3000 (Windows)
const { exec } = require('child_process');

console.log('Finding process on port 3000...');

exec('netstat -ano | findstr :3000', (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error.message);
        return;
    }

    if (!stdout) {
        console.log('No process found on port 3000');
        return;
    }

    console.log('\nProcesses using port 3000:');
    console.log(stdout);

    // Extract PID from output
    const lines = stdout.trim().split('\n');
    const pids = new Set();
    
    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 0) {
            const pid = parts[parts.length - 1];
            if (pid && !isNaN(pid)) {
                pids.add(pid);
            }
        }
    });

    if (pids.size === 0) {
        console.log('Could not find PID');
        return;
    }

    console.log('\nKilling processes...');
    pids.forEach(pid => {
        console.log(`Killing process with PID: ${pid}`);
        exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error killing PID ${pid}:`, error.message);
            } else {
                console.log(`✓ Successfully killed PID ${pid}`);
            }
        });
    });

    console.log('\nWait a few seconds, then try: npm start');
});

