# deploy next.js

## local to Verify

```sh
npm install -g vercel
vercel login
vercel
```
```sh
D:\github\lang\PyProjects\blog\remio-home-next>vercel
Vercel CLI 37.4.1
? Set up and deploy “D:\github\lang\PyProjects\blog\remio-home-next”? yes
? Which scope do you want to deploy to? Nahida-aa's projects
? Link to existing project? [y/N] n
? What’s your project’s name?aa-home
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
🔍  Inspect: https://vercel.com/Nahida-aa/my-nextjs-app/abc123 [1s]
✅  Production: https://my-nextjs-app.vercel.app [copied to clipboard] [3s]
📝 Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡 To change the domain or build command, go to https://vercel.com/nahida-aas-projects/aa-home/settings
```

### domains
Vercel 在部署过程中会生成多个 URL，以便你可以在不同的环境中访问你的应用。以下是这些 URL 的含义：

1. **主域名**：
   - `https://aa-home.vercel.app/`
   - 这是你的应用的主域名，通常是你在 Vercel 项目设置中配置的域名。

2. **项目域名**：
   - `https://aa-home-nahida-aas-projects.vercel.app/`
   - 这是你的项目在 Vercel 上的默认域名，包含你的项目名称和 Vercel 用户名。

3. **团队域名**：
   - `https://aa-home-nahida-aa-nahida-aas-projects.vercel.app/`
   - 如果你在团队中工作，Vercel 会生成一个包含团队名称的域名。

4. **预览域名**：
   - `https://aa-home-852lk5u5f-nahida-aas-projects.vercel.app/`
   - 这是一个唯一的预览域名，用于每次部署的预览版本。这个 URL 包含一个唯一的标识符，以区分不同的部署版本。

#### 如何使用这些域名

- **主域名**：这是你主要分享和使用的域名，通常是你在生产环境中使用的域名。
- **项目域名**：这是你的项目在 Vercel 上的默认域名，可以用于开发和测试。
- **团队域名**：如果你在团队中工作，这个域名可以用于团队内部的协作和测试。
- **预览域名**：用于查看每次部署的预览版本，确保代码在合并到主分支之前是正确的。

#### 确保应用的安全性

如果你希望限制访问，可以考虑以下几种方法：

1. **环境变量**：
   使用环境变量来存储敏感信息，并在代码中进行访问控制。

2. **身份验证**：
   实现身份验证机制，确保只有授权用户才能访问特定页面或 API。

3. **Vercel 访问控制**：
   Vercel 提供了访问控制功能，你可以在 Vercel 仪表盘中配置保护你的项目。

#### 使用环境变量进行访问控制

1. **设置环境变量**：
   在项目根目录创建 `.env.local` 文件，并添加环境变量：

   ```env
   NEXT_PUBLIC_API_KEY=your_api_key
   ```

2. **在代码中使用环境变量**：

   ```javascript
   // pages/index.js
   export default function Home() {
     const apiKey = process.env.NEXT_PUBLIC_API_KEY;

     if (!apiKey) {
       return <div>Access Denied</div>;
     }

     return <div>Welcome to my Next.js app!</div>;
   }
   ```

#### 实现简单的身份验证

```javascript
// pages/api/auth.js
export default function handler(req, res) {
  const { authorization } = req.headers;

  if (authorization !== `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ message: 'Authorized' });
}
```

通过这些步骤，你可以确保你的应用在公开访问时具有一定的安全性。

### update

```sh
pnpm build
git init
git add .
git commit -m "init: aa-home"
git remote add origin git@github.com:Nahida-aa/aa-home.git
git push -u origin main
```

## Docker

## AWS

## Azure

## Netlify

## Nginx 和 PM2
