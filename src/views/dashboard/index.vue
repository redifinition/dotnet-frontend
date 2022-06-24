<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div>通过爬虫获取数据</div> -->
    <mavon-editor
      v-model="value"
      style="z-index:0"
      :subfield="false"
      :default-open="'preview'"
      :editable="false"
      :toolbars-flag="false"
      :navigation="false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: { mavonEditor },
  data() {
    return {
      value: '# .net 开发笔记\n' +
        '\n' +
        '# **ASP.NET Core 开发笔记**\n' +
        '\n' +
        '## **项目结构**\n' +
        '\n' +
        '### **添加数据库上下文**\n' +
        '\n' +
        'Entity Framework Core 是一个ORM（实体-关系对象映射器）。EF core是一款轻量级、可扩展、开源的软件。和.Net Core一样，EF Core也是跨平台的。它适用于windows、Mac OS和Linux。EF core中一个非常重要的类是DbContext类。这是我们在应用程序代码中用于与底层数据库交互的类。该类管理数据库连接，并用于检索和保存数据库中的数据。\n' +
        '\n' +
        '具体做法事，在我们的应用程序中使用DbContext类，我们创建了一个派生自DbContext类的类。DbContext类在Microsoft中。EntityFrameworkCore名称空间。\n' +
        '\n' +
        '### **DbContextOptions in Entity Framework Core**\n' +
        '\n' +
        '我们首先需要创建一个DbContextOptions类的实例。DbContextOptions实例携带配置信息，如连接字符串、要使用的数据库提供程序等。\n' +
        '\n' +
        '使用如下的代码：\n' +
        '\n' +
        '```csharp\n' +
        'public AppDbContext(DbContextOptions<AppDbContext> options)\n' +
        '        : base(options)\n' +
        '    {\n' +
        '    }\n' +
        '```\n' +
        '\n' +
        '除此之外我们需要提供数据库的连接字符串。为了保证数据库的信息开源时不被泄露，我们使用**`userSecret`**来保存我们的连接字符串等信息。使用如下的命令来存储连接字符串.\n' +
        '\n' +
        '[.NET Core程序中使用User Secrets存储敏感数据 - 走看看 (zoukankan.com)](http://t.zoukankan.com/nianming-p-7068253.html)\n' +
        '\n' +
        '这里我们使用.NET Core提供的Secret manager工具，它帮我们抽象了一些细节，比如数据存储在哪以及如何存储的问题。简单来说它帮助我们将数据以明文的形式存在了本地的一个json文件中。系统不同存储的位置也不一样。配置User Secrets及访问需要用到两个包，分别为\n' +
        '\n' +
        '```csharp\n' +
        'Microsoft.Extensions.SecretManager.Tools\n' +
        'Microsoft.Extensions.Configuration.UserSecrets\n' +
        '```\n' +
        '\n' +
        '第一个是工具包，可以使用**`dotnet user-secrets`**命令将数据存储到json文件中，第二个包可以通过.NET Core的配置系统访问存储在json文件中的数据。\n' +
        '\n' +
        '```bash\n' +
        'dotnet user-secrets -h\n' +
        '```\n' +
        '\n' +
        '这个命令可以查看Secret Manager的用法。\n' +
        '\n' +
        'userSecretsId在.csproj文件中指定。\n' +
        '\n' +
        '```xml\n' +
        '<PropertyGroup>\n' +
        '  <UserSecretsId>userSecretsId的值</UserSecretsId>\n' +
        '</PropertyGroup>\n' +
        '```\n' +
        '\n' +
        '可以使用如下格式的指令来添加数据库连接字符串；\n' +
        '\n' +
        '```bash\n' +
        'dotnet user-secrets set AmazonDataWarehouse:MySQLConnectionString server=<server>; port=3306; database=<database>; uid=<uid>; pwd=<pwd>; CharSet=utf8\n' +
        '```\n' +
        '\n' +
        '之后便可以使用**`builder.Configuration["AmazonDataWarehouse:MySQLConnectionString"]`**对连接字符串进行访问\n' +
        '\n' +
        '### **使用dotnet ef tools自动添加Mysql实体**\n' +
        '\n' +
        '由于visua studio for mac没有程序包管理器控制台，我们只能使用Mac自带的shell使用dotnet ef tools来执行`scaffold-dbcontext`\n' +
        '\n' +
        '命令。\n' +
        '\n' +
        '![https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-19%2000.14.44.png](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-19%2000.14.44.png)\n' +
        '\n' +
        '首先需要安装dotnet ef tools.\n' +
        '\n' +
        '我们从终端进入到项目文件夹，然后执行以下指令：\n' +
        '\n' +
        '```bash\n' +
        'dotnet tool install --global dotnet-ef\n' +
        '```\n' +
        '\n' +
        '这样我们就可以使用该工具来替代Windows中的程序包管理器控制台。\n' +
        '\n' +
        '之后，我们运行如下格式的指令：\n' +
        '\n' +
        '```bash\n' +
        'dotnet ef dbcontext scaffold "server=<server>;uid=<uid>;pwd=<pwd>;port=3306;database=<database>;"  Pomelo.EntityFrameworkCore.Mysql -f -o Models\n' +
        '```\n' +
        '\n' +
        '即可自动将实体加入到项目中：\n' +
        '\n' +
        '<img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-19%2000.18.32.png" alt="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-19%2000.18.32.png" style="zoom:50%;" />\n' +
        '\n' +
        '```bash\n' +
        'dotnet user-secrets set AmazonDataWarehouse:Neo4jConnectionSettings:UserName neo4j\n' +
        'dotnet user-secrets set AmazonDataWarehouse:Neo4jConnectionSettings:Server bolt://47.102.195.143:7687\n' +
        'dotnet user-secrets set AmazonDataWarehouse:Neo4jConnectionSettings:Password lq19991212wanzq\n' +
        'dotnet user-secrets set "AmazonDataWarehouse:MySQLConnectionString" "server=47.102.195.143; port=3306; database=DataWarehouse; uid=Re; pwd=lq19991212wanzq; CharSet=utf8"\n' +
        'dotnet user-secrets set "AmazonDataWarehouse:MySQLTraceabilityQueries" "server=121.5.140.125; port=3306; database=data_warehouse; uid=root; pwd=991011Wly.; CharSet=utf8"\n' +
        '```\n' +
        '\n' +
        '### **Repository Pattern**\n' +
        '\n' +
        '存储库模式是数据访问层的抽象。它隐藏了数据在数据库里存储和获取的细节。对应的，存储库模式接口规定了：\n' +
        '\n' +
        '1. 该存储库支持什么样的操作和方法\n' +
        '2. 每个操作要求的数据类型以及返回的数据类型\n' +
        '3. 接口只包含存储库能做什么，而不关心实现的细节\n' +
        '4. 实现细节在对应的repository class中体现\n' +
        '\n' +
        '我们使用**`AddScoped()`**方法，因为我们希望实例是灵活的，并且对给定HTTP请求的整个范围可用。对于另一个新的HTTP请求，将提供EmployeeRepository类的一个新实例，它将在该HTTP请求的整个范围内可用。在整个应用程序中，所有注入IEmployeeRepository的地方都提供了EmployeeRepository的实例。如果希望应用程序使用不同的实现，只需要更改下面一行代码。\n' +
        '\n' +
        '在代码中使用Repository Pattern有如下的好处：\n' +
        '\n' +
        '1. 代码更干净，更容易重用和维护。\n' +
        '2. 使我们能够创建松散耦合的系统。例如，如果我们希望我们的应用程序使用oracle而不是sql server，实现一个知道如何读写oracle数据库的OracleRepository，并向依赖注入系统注册OracleRepository。\n' +
        '3. 在单元测试项目中，很容易将真实的存储库替换为用于测试的伪实现。\n' +
        '\n' +
        '### **Controller**\n' +
        '\n' +
        '在编写Web API中，我们的Controller应该去继承**`ControllerBase`**而不是**`Controller`**，这个基类提供了许多用于处理 HTTP 请求的标准功能，让我们可以专注于应用程序的特定业务逻辑。对于每个控制器类我们需要使用两个重要属性：\n' +
        '\n' +
        '1. **`[ApiController]`** 启用固定行为，使生成 Web API 更加容易。 一些行为包括参数源推理、将属性路由作为一项要求以及模型验证错误处理增强功能。\n' +
        '2. **`[Route]`** 定义路由模式 **`[controller]`**。 **`[controller]`** 令牌将替换为控制器的名称（不区分大小写，无 Controller 后缀）。\n' +
        '\n' +
        '## **API 写法**\n' +
        '\n' +
        '### **Controller**\n' +
        '\n' +
        '### **返回Json格式的数据**\n' +
        '\n' +
        '这里我使用了**`JsonConvert`**类，该类提供了Json序列化和反序列化的方法。我们需要安装**`Microsoft.AspNetCore.Mvc.NewtonsoftJson`**包，在控制器中，我们只需要在方法中定义匿名类即可。\n' +
        '\n' +
        '### **执行时间中间件监控接口执行时间**\n' +
        '\n' +
        '[.Net Core实现记录接口执行时间的中间件 - 码农教程 (manongjc.com)](http://www.manongjc.com/detail/26-uvpzbpncqpnohxm.html)\n' +
        '\n' +
        '```csharp\n' +
        'namespace ExecutionTime\n' +
        '{\n' +
        '    public class CalculateExecutionTimeMiddleware\n' +
        '    {\n' +
        '        private readonly RequestDelegate _next;\n' +
        '        private readonly ILogger _logger;\n' +
        '\n' +
        '        Stopwatch stopwatch;\n' +
        '        public CalculateExecutionTimeMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)\n' +
        '        {\n' +
        '            if (next == null)\n' +
        '            {\n' +
        '                throw new ArgumentNullException(nameof(next));\n' +
        '            }\n' +
        '\n' +
        '            if (loggerFactory == null)\n' +
        '            {\n' +
        '                throw new ArgumentNullException(nameof(loggerFactory));\n' +
        '            }\n' +
        '\n' +
        '            this._next = next;\n' +
        '            _logger = loggerFactory.CreateLogger<CalculateExecutionTimeMiddleware>();\n' +
        '        }\n' +
        '\n' +
        '        public async Task Invoke(HttpContext context)\n' +
        '        {\n' +
        '            stopwatch = new Stopwatch();\n' +
        '            stopwatch.Start();\n' +
        '            await _next.Invoke(context);\n' +
        '\n' +
        '            stopwatch.Stop();\n' +
        '            _logger.LogInformation($@"接口{context.Request.Path}耗时{stopwatch.ElapsedMilliseconds}ms");\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '## 数据库配置\n' +
        '\n' +
        '### 图数据库配置\n' +
        '\n' +
        '在配置neo4j上踩了很多坑，这里做一个记录。\n' +
        '\n' +
        '首先需要在ubuntu系统中配置neo4j数据库。具体做法如下：\n' +
        '\n' +
        '**安装正确版本的JDK**\n' +
        '\n' +
        '这一步非常重要，因为neo4j是依赖java的。我们首先在以下网址下载java8\n' +
        '\n' +
        '[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)\n' +
        '\n' +
        '<img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.02.09.png" alt="截屏2022-06-22 16.02.09.png" style="zoom: 33%;" />\n' +
        '\n' +
        '然后将其放在`/usr/lib/jvm`目录下，进行解压：进入到对应的目录下，使用解压命令：\n' +
        '\n' +
        '```bash\n' +
        'tar -xzvf jdk-8u333-linux-x64.tar.gz\n' +
        '```\n' +
        '\n' +
        '之后我们需要配置环境变量，这一步也是必要的。\n' +
        '\n' +
        '我们修改`bashrc`文件来配置环境变量 使用vim ~/.bashrc打开该文件，在文件末尾添加如下信息：\n' +
        '\n' +
        '```bash\n' +
        'export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_333\n' +
        'export JRE_HOME=${JAVA_HOME}/jre\n' +
        'export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib\n' +
        'export PATH=${JAVA_HOME}/bin:$PATH\n' +
        '```\n' +
        '\n' +
        '使用命令`source ~/.bashrc` 生效配置文件\n' +
        '\n' +
        '最后使用命令检查java版本：`java -version` \n' +
        '\n' +
        '<img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.11.59.png" alt="截屏2022-06-22 16.11.59.png" style="zoom:50%;" />\n' +
        '\n' +
        '这样jdk就安装完毕了\n' +
        '\n' +
        '**安装Neo4j**\n' +
        '\n' +
        '这里我们只需要使用sudo命令即可完成安装。使用如下命令：\n' +
        '\n' +
        '`sudo apt-get install neo4j`\n' +
        '\n' +
        '完成安装后，我们使用`neo4j console` 来查看neo4j是否可以正常运行。如果显示如下结果：\n' +
        '\n' +
        '<img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.14.31.png" alt="截屏2022-06-22 16.14.31.png" style="zoom:50%;" />\n' +
        '\n' +
        '则表示运行成功。而如果显示如下的结果：\n' +
        '\n' +
        '![截屏2022-06-22 16.15.11.png](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.15.11.png)\n' +
        '\n' +
        '这里的意思是neo4j被其他运行的进程占用。很可能是在之前你启动过neo4j，这个进程阻塞了当前数据库的启动。因此解决的思路就是杀掉之前的进程，然后就乐意重新启动了。我们使用`ps aux | grep "org.neo4j.server”` 命令查看当前neo4j的进程：\n' +
        '\n' +
        '![截屏2022-06-22 16.16.59.png](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.16.59.png)\n' +
        '\n' +
        '可以看到当前以及有进程占用了，那么我们杀掉当前的neo4j进程：\n' +
        '\n' +
        '`kill 1282573`\n' +
        '\n' +
        '如此一来，我们就可以再次使用`neo4j console`启动图数据库了。\n' +
        '\n' +
        '**配置neo4j公网ip以允许远程访问**\n' +
        '\n' +
        '这里以阿里云服务器为例子。我们首先修改neo4j的配置文件，位置在`/etc/neo4j/neo4j.conf` .我们使用编辑器打开它：\n' +
        '\n' +
        '![截屏2022-06-22 16.19.27.png](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.19.27.png)\n' +
        '\n' +
        '修改如下几行的配置。54行允许外部网站访问，如果不取消注释就只能在本地访问了，这对于没有图形化界面的ubuntu操作系统是很不友好的。69，71，74，75行也应进行相应的配置。\n' +
        '\n' +
        '除此之外，还有非常重要的一点是开启ubuntu的防火墙的对应端口。这里我们使用了7474和7687两个端口。\n' +
        '\n' +
        '```bash\n' +
        'firewall-cmd --zone=public --permanent --add-port=7687/tcp\n' +
        '```\n' +
        '\n' +
        '比如如上开启了7687端口，使用相同的命令开启7474端口。\n' +
        '\n' +
        '最后不要忘记使用命令`firewall-cmd --reload` 使防火墙配置生效。\n' +
        '\n' +
        '最后，由于我们的服务器是阿里云服务器，因此也要在阿里云配置对应的安全组规则。\n' +
        '\n' +
        '![截屏2022-06-22 16.24.31.png](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/%E6%88%AA%E5%B1%8F2022-06-22_16.24.31.png)\n' +
        '\n' +
        '比如这里我们添加对应的端口的安全组规则，以使公网IP可以正常访问这两个端口。\n' +
        '\n' +
        '至此，我们使用网址http://<你的服务器的公网IP>:7474/browser就可以正常访问图数据库了。\n' +
        '\n' +
        '## .NET Core Web API部署到ubuntu服务器\n' +
        '\n' +
        '### .NET SDK安装\n' +
        '\n' +
        '首先打开ubuntu终端，安装.NET SDK.我个人的服务器对应的ubuntu系统是`ubuntu20.04` .具体的安装过程参考Micriosoft官方文档：\n' +
        '\n' +
        '[Install .NET on Ubuntu - .NET | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu#2004)\n' +
        '\n' +
        '首先运行如下命令:\n' +
        '\n' +
        '```bash\n' +
        'wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb\n' +
        'sudo dpkg -i packages-microsoft-prod.deb\n' +
        'rm packages-microsoft-prod.deb\n' +
        '```\n' +
        '\n' +
        '然后使用如下命令安装.NEY SDK:\n' +
        '\n' +
        '```bash\n' +
        'sudo apt-get update; \\\n' +
        '  sudo apt-get install -y apt-transport-https && \\\n' +
        '  sudo apt-get update && \\\n' +
        '  sudo apt-get install -y dotnet-sdk-6.0\n' +
        '```\n' +
        '\n' +
        '![Untitled](net%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0%20feb7955439a5451b8229a8ea01ae20e1/Untitled.png)\n' +
        '\n' +
        '如果安装成功，我们应该能看到上述的信息。\n' +
        '\n' +
        '为了使得部署的项目能通过ip访问，我们需要安装nginx来模拟Windows上的IIS。\n' +
        '\n' +
        '### 项目发布\n' +
        '\n' +
        '对于本地的项目，我们首先需要修改\n' +
        '\n' +
        '根据官方文档，我们还需要配置`Properties/launchSettings.json` ：\n' +
        '\n' +
        '```json\n' +
        '{\n' +
        '  "$schema": "https://json.schemastore.org/launchsettings.json",\n' +
        '  "iisSettings": {\n' +
        '    "windowsAuthentication": false,\n' +
        '    "anonymousAuthentication": true,\n' +
        '    "iisExpress": {\n' +
        '      "applicationUrl": "http://0.0.0.0:21045",\n' +
        '      "sslPort": 0\n' +
        '    }\n' +
        '  },\n' +
        '  "profiles": {\n' +
        '    "DataWarehouse": {\n' +
        '      "commandName": "Project",\n' +
        '      "dotnetRunMessages": true,\n' +
        '      "launchBrowser": true,\n' +
        '      "launchUrl": "swagger/index.html",\n' +
        '      "applicationUrl": "http://0.0.0.0:5000", #修改\n' +
        '      "environmentVariables": {\n' +
        '        "ASPNETCORE_ENVIRONMENT": "Development"\n' +
        '      },\n' +
        '      "dotnetRunnMessages":  true #修改\n' +
        '    },\n' +
        '    "IIS Express": {\n' +
        '      "commandName": "IISExpress",\n' +
        '      "launchBrowser": true,\n' +
        '      "launchUrl": "swagger",\n' +
        '      "environmentVariables": {\n' +
        '        "ASPNETCORE_ENVIRONMENT": "Development"\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '其中注释的部分需要修改，以使得部署后通过外网可以访问。\n' +
        '\n' +
        '然后修改`appsettings.json` :\n' +
        '\n' +
        '```json\n' +
        '{\n' +
        '  "Logging": {\n' +
        '    "LogLevel": {\n' +
        '      "Default": "Information",\n' +
        '      "Microsoft.AspNetCore": "Warning"\n' +
        '    }\n' +
        '  },\n' +
        '  "AllowedHosts": "*",\n' +
        '  "ConnectionStrings": {\n' +
        '    "DataWarehouse": "Server=47.102.195.143;Port=3306;Database=DataWarehouse;Uid=Re; "\n' +
        '  },\n' +
        '  "Cors": "*", #增加\n' +
        '  "urls": "http://*:6001" #增加\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '增加如下的两行，分别允许CORS跨域和最终允许的端口。\n' +
        '\n' +
        '最后我们还需要进行连接字符串的配置修改。在本机，我们为了使得开源代码隐藏连接字符串信息使用了user-secrets，在部署时则需要换回原始的连接字符串。\n' +
        '\n' +
        '之后我们可以打开对应项目位置的Powershell,运行：\n' +
        '\n' +
        '```bash\n' +
        'dotnet publish --configuration Release\n' +
        '```\n' +
        '\n' +
        '这样就能得到打包好的项目文件了。\n' +
        '\n' +
        '我们讲`bin\\Release\\net6.0\\publish` 文件夹放入服务器的合适位置。\n' +
        '\n' +
        '### Nginx配置\n' +
        '\n' +
        '安装完成nginx后，我们编辑nginx配置文件：\n' +
        '\n' +
        '```bash\n' +
        'vim /etc/nginx/sites-available/default\n' +
        '```\n' +
        '\n' +
        '修改成如下形式：\n' +
        '\n' +
        '```\n' +
        'server {\n' +
        '    listen 80;\n' +
        '\n' +
        '# SSL configuration\n' +
        '#\n' +
        '# listen 443 ssl default_server;\n' +
        '# listen [::]:443 ssl default_server;\n' +
        '#\n' +
        '# Note: You should disable gzip for SSL traffic.\n' +
        '# See: https://bugs.debian.org/773332\n' +
        '#\n' +
        '# Read up on ssl_ciphers to ensure a secure configuration.\n' +
        '# See: https://bugs.debian.org/765782\n' +
        '#\n' +
        '# Self signed certs generated by the ssl-cert package\n' +
        '# Don\'t use them in a production server!\n' +
        '#\n' +
        '# include snippets/snakeoil.conf;\n' +
        '\n' +
        '    root /var/www/html;\n' +
        '\n' +
        '# Add index.php to the list if you are using PHP\n' +
        '    index index.html index.htm index.nginx-debian.html;\n' +
        '\n' +
        '    server_name _;\n' +
        '\n' +
        '    location / {\n' +
        '# First attempt to serve request as file, then\n' +
        '# as directory, then fall back to displaying a 404.\n' +
        '        proxy_pass http://localhost:6001;\n' +
        '                   proxy_http_version 1.1;\n' +
        '                   proxy_set_header Upgrade $http_upgrade;\n' +
        '                   proxy_set_header Connection keep-alive;\n' +
        '                   proxy_set_header Host $host;\n' +
        '                   proxy_cache_bypass $http_upgrade;\n' +
        '\n' +
        '    }\n' +
        '\n' +
        '```\n' +
        '\n' +
        '监听的端口一定要修改成80\n' +
        '\n' +
        '### 使用supervisor在ubuntu运行项目\n' +
        '\n' +
        '首先安装Supervisor: \n' +
        '\n' +
        '```bash\n' +
        'sudo apt-get install supervisor\n' +
        '```\n' +
        '\n' +
        '让你和在/etc/supervisor/conf.d下新建一个配置文件，名字就是我们所在项目的名字：\n' +
        '\n' +
        '```bash\n' +
        'sudo touch /etc/supervisor/conf.d/DataWarehouse.conf\n' +
        '```\n' +
        '\n' +
        '然后使用vim命令编辑，加入如下的内容：\n' +
        '\n' +
        '```bash\n' +
        '[program:DateWarehouse]\n' +
        'command=dotnet DataWarehouse.dll#要执行的命令\n' +
        'directory=/root/dotnet/publish#命令执行的目录\n' +
        'environment=ASPNETCORE__ENVIRONMENT=Production#环境变量\n' +
        'user=root#进程执行的用户身份\n' +
        'stopsignal=INT\n' +
        'autostart=true#是否自动启动\n' +
        'autorestart=true#是否自动重启\n' +
        'startsecs=1#自动重启间隔\n' +
        'stderr_logfile=/var/log/DataWarehouse.err.log#标准错误日志\n' +
        'stdout_logfile=/var/log/DataWarehouse.out.log#标准输出日志\n' +
        '```\n' +
        '\n' +
        '配置好后重新加载配置：\n' +
        '\n' +
        '```bash\n' +
        'sudo service supervisor stop\n' +
        'sudo service supervisor start\n' +
        '```\n' +
        '\n' +
        '然后我们的服务就已经在服务器上开启了。我们可以使用如下网址进行访问：\n' +
        '\n' +
        '[Swagger UI](http://47.102.195.143:6001/swagger/index.html)\n' +
        '\n' +
        '<img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Untitled%201.png" alt="Untitled" style="zoom:50%;" />'
    }
  },
  created() {
    var axios = require('axios')

    var config = {
      method: 'get',
      url: '../src/assets/doc.md',
      headers: { }
    }

    axios(config)
      .then((response) => {
        this.value = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
