
## DataTable Merge

1. DataTable의 Merge 방법

    - 단순 merge 시 columns의 이름이 다를 경우  
      아래와 같은 현상이 발생

| First Header | Second Header | Third Header | Fourth Header |
| ------------ | ------------- | ------------ | ------------- |
| DATA 1       |               |              |               |
| DATA 2       |               |              |               |
| DATA 3       |               |              |               |
|              | Second Data 1 |              |               |
|              | Second Data 2 |              |               |
|              | Second Data 3 |              |               |
|              |               | Third DATA 1 |               |
|              |               | Third DATA 2 |               |
|              |               | Third DATA 3 |               |
|              |               |              | Fourth Data 1 |
|              |               |              | Fourth Data 2 |
|              |               |              | Fourth Data 3 |


그래서 구글링 이후 사용해본 코드

```
 public static DataTable MergeDataTableCustom(DataTable dt1, DataTable dt2)
{
    if (dt1 == null || dt2 == null)
    {
        throw new ArgumentNullException("t1 or t2", "Both tables must not be null");
    }
    
    DataTable dt3 = dt1.Clone();

    foreach (DataColumn col in dt1.Columns)
    {
        string newColumnName = col.ColumnName;
        int colNum = 1;
        
        while (dt3.Columns.Contains(newColumnName))
        {
            newColumnName = $"{col.ColumnName}_{++colNum}";
        }
        
        dt3.Columns.Add(newColumnName, col.DataType);
    }

    // dt1과 dt2를 행(Row) 기준으로 병합하여 mergedRow 생성
    var mergedRow = dt1.AsEnumerable().Zip(dt2.AsEnumerable(), (r1, r2) => r1.ItemArray.Concat(r2.ItemArray).ToArray());

    // mergedRow의 각 요소를 dt3에 행(Row)으로 추가
    foreach (object[] rowFields in mergedRow)
    {
        dt3.Rows.Add(rowFields);
    }
    return dt3;
}
```

<br/>

여기에서 
+       var mergedRow = dt1.AsEnumerable().Zip(dt2.AsEnumerable(), (r1, r2) => r1.ItemArray.Concat(r2.ItemArray).ToArray());


이 부분이 핵심이라고 생각

C# LINQ의 .Zip 함수는 두 개의 시퀀스(Enumerable)를 짝지어서 새로운 시퀀스를 만드는 기능을 제공하며 .Zip 함수는 각 시퀀스에서 같은 인덱스에 있는 요소들을 하나의 쌍으로 묶어주는 역할을 한다. 이때 유의 해야 할 것은 .Zip 코드 사용 시 두 시퀀스의 길이가 같아야 한다. 

<br/>
<br/>
<br/>


#### 다음은 완성된 코드를 통해 뽑아낸 결과

| First Header | Second Header | Third Header | Fourth Header |
| ------------ | ------------- | ------------ | ------------- |
| DATA 1       | Second Data 1 | Third DATA 1 | Fourth Data 1 |
| DATA 2       | Second Data 2 | Third DATA 2 | Fourth Data 2 |
| DATA 3       | Second Data 3 | Third DATA 3 | Fourth Data 3 |
---
<br>