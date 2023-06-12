
## 파일시스템 (FileSystem)

1. C# 프로그램의 파일 입출력을 위해 System 과 System.IO 네임스페이스에는 이를 목적으로 만들어진 클래스가 존재

```
 1. Directory.GetCurrentDirectory()
    - 현재 프로세스의 기본 작업 디렉토리
    - GetCurrentDirectory()는 메서드 호출을 통해 값을 가져옴

 2. Environment.CurrentDirectory
    - 현재 프로세스의 작업 디렉토리
    - CurrentDirectory는 속성에 직접 접근하여 값을 가져옴
```

<br/>

+ 차이점
GetCurrentDirectory()는 using System.IO를 사용해야함  
CurrentDirectory는 using System을 사용해야함  
사용법의 차이가 있음

---
<br>

### 디렉토리 (Directory)

+ Directory, Path, Environment의 정적를래스를 사용할 수 있고, 파일 시스템에 관해 많은 작업 수행 가능

```
CreateDirectory() 메서드로 Directory 생성이 가능하며,  
Combine() 메서드로 결합시 경로분리문자를 리터럴로 사용하지 않아도 디렉토리를 결합해 준다.
```

---
<br>

### 파일 (File)

+ StreamWriter와 StreamReader로 쓰기 와 읽기가 가능하다.
+ File의 Open()이라는 메서드에서 아래와 같은 3가지 enum 옵션값 설정이 가능하다. 

```
1. FileMode : 파일의 열기 모드 설정. FileMode.Create, FileMode.Open 등

2. FileAccess : 파일 액세스 레벨 설정. FileAccess.Read, FileAccess.Write 등

3. FileShare : 파일 공유 레벨 설정. FileShare.None, FileShare.Read, FileShare.Delete 등

```
```
ex ) 파일을 읽기 모드로 열고, 다른 프로세스도 읽을 수 있도록 허용
FileStream file = File.Open("path/to/file.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
```



