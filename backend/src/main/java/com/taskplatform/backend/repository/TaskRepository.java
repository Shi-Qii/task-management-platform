package com.taskplatform.backend.repository;

import com.taskplatform.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

// [AI assisted - backend.md #1]
public interface TaskRepository extends JpaRepository<Task, Long> {

    // [AI assisted - backend.md #8]
    // JPQL 版本：目前 findAll 實際用的就是這個，取代方法名稱推導的寫法
    @Query("SELECT t FROM Task t ORDER BY t.createdAt ASC")
    List<Task> findAllByOrderByCreatedAtAsc();

    // 範本：JPQL 版本，用 @Param 綁參數，取代 JpaRepository 內建的 findById
    @Query("SELECT t FROM Task t WHERE t.id = :id")
    Optional<Task> findByIdCustom(@Param("id") Long id);

    // 範本：native SQL 版本，nativeQuery = true 就是直接寫 SQL，欄位/表名用資料庫實際的 snake_case。
    // 參數用數字（0/1）而不是 boolean —— 這是 MySQL 常見習慣（boolean 底層就是 tinyint，可以直接 completed = 1）。
    // 但這裡接的是 Postgres，Postgres 有獨立的 boolean 型別，不能直接拿整數當 boolean 比較，
    // 要嘛顯式轉換（(:completed <> 0)），要嘛把欄位設計成真的用數字/tinyint 儲存。這裡示範前者的寫法。
    @Query(value = "SELECT * FROM tasks WHERE completed = (:completed <> 0) ORDER BY created_at ASC", nativeQuery = true)
    List<Task> findByCompletedNative(@Param("completed") int completed);

    
    @Query(value = "SELECT * FROM tasks WHERE title=?1 ORDER BY created_at ASC", nativeQuery = true)
    List<Task> findByTitle(@Param("completed") int completed);
}
