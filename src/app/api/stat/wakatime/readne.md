是的，WakaTime 提供了 API，允许开发者访问他们的编程活动数据。WakaTime 的 API 可以用于获取用户的编码时间、项目统计、语言使用情况等信息。

### WakaTime API 概述

WakaTime 提供了多个端点来访问不同类型的数据。以下是一些常用的 API 端点：

1. **用户统计**：
    - 获取用户的编码时间统计数据。
    - 端点：`/users/current/stats/{range}`
    - 示例：`https://wakatime.com/api/v1/users/current/stats/last_7_days`

2. **项目统计**：
    - 获取特定项目的编码时间统计数据。
    - 端点：`/users/current/projects/{project}`
    - 示例：`https://wakatime.com/api/v1/users/current/projects/my_project`

3. **语言统计**：
    - 获取用户使用的编程语言统计数据。
    - 端点：`/users/current/languages`
    - 示例：`https://wakatime.com/api/v1/users/current/languages`

### 使用 WakaTime API 的示例

以下是一个使用 Node.js 和 Axios 库调用 WakaTime API 的示例代码：

```javascript


const

 axios = require('axios');

const API_KEY = 'your_wakatime_api_key';
const BASE_URL = 'https://wakatime.com/api/v1';

// 获取用户的编码时间统计数据
async function getUserStats(range) {
  try {
    const response = await axios.get(`${BASE_URL}/users/current/stats/${range}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user stats:', error);
  }
}

// 调用函数获取过去 7 天的统计数据
getUserStats('last_7_days');
```

### 获取 API 密钥

要使用 WakaTime API，你需要一个 API 密钥。你可以按照以下步骤获取你的 API 密钥：

1. 登录到你的 WakaTime 账户。
2. 进入 [WakaTime API 密钥页面](https://wakatime.com/settings/api-key)。
3. 复制你的 API 密钥。

### API 文档

你可以在 WakaTime 的官方文档中找到更多关于 API 的详细信息和使用示例：

- [WakaTime API 文档](https://wakatime.com/developers)

### 总结

WakaTime 提供了丰富的 API 端点，允许开发者访问他们的编程活动数据。你可以使用这些 API 获取用户的编码时间、项目统计、语言使用情况等信息。确保你有一个有效的 API 密钥，并参考官方文档获取更多详细信息。

如果有任何问题或需要进一步的解释，请随时告诉我。

## test
