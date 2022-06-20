# Open Eyebeam Gameserver

Base on `create-colyseus-app`

## Set up

### Preparation

```
sudo apt-get update
sudo apt-get upgrade
```

### Install node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 14.17.5
sudo npm install -g typescript
sudo npm install -g ts-node
```

### Install nginx

```
sudo apt install nginx
sudo systemctl status nginx
```

### Install PM2

```
sudo npm install pm2@latest -g
```

### Start gameserver

```
pm2 start run-ts.sh --name SERVER
pm2 dashboard
```

### Set up Nginx with domain name

Add to `/etc/nginx/sites-available`

```
server {
    listen 80;
    server_name *** YOR DOMAIN NAME ***;

    location / {
        proxy_pass http://localhost:2567;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

Test and restart

```
sudo nginx -t
sudo systemctl restart nginx
```

### Get SSL certificate for domain

```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d *** YOR DOMAIN NAME ***
```

## Structure

- `index.ts`: main entry point, register an empty room handler and attach [`@colyseus/monitor`](https://github.com/colyseus/colyseus-monitor)
- `MyRoom.ts`: an empty room handler for you to implement your logic
- `loadtest/example.ts`: scriptable client for the loadtest tool (see `npm run loadtest`)
- `package.json`:
    - `scripts`:
        - `npm start`: runs `ts-node index.ts`
        - `npm run loadtest`: runs the [`@colyseus/loadtest`](https://github.com/colyseus/colyseus-loadtest/) tool for testing the connection, using the `loadtest/example.ts` script.
    - `dependencies`:
        - `colyseus`
        - `@colyseus/monitor`
        - `express`
    - `devDependencies`
        - `ts-node`
        - `typescript`
        - `@colyseus/loadtest`
- `tsconfig.json`: TypeScript configuration file


## License

MIT
