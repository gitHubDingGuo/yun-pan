package com.netdisc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.netdisc.pojo.File;
import com.netdisc.pojo.FileVo;

/**
 * @author Stodger
 * @date 2019年8月28日
 * @version
 */
@Repository
@Mapper
public interface FileMapper {
	/**
	 * 根据Id删除(不推荐使用)
	 * 
	 * @param id
	 * @return
	 */
	int deleteByPrimaryKey(Integer id);

	/**
	 * 添加文件(含空值)
	 * 
	 * @param record
	 * @return
	 */
	int insert(File record);

	/**
	 * 添加文件(不含空值)
	 * 
	 * @param record
	 * @return
	 */
	int insertSelective(File record);

	/**
	 * 根据Id查询
	 * 
	 * @param id
	 * @return
	 */
	File selectByPrimaryKey(Integer id);

	/**
	 * 更新文件(不含空值)
	 * 
	 * @param record
	 * @return
	 */
	int updateByPrimaryKeySelective(File record);

	/**
	 * 更新文件(含空值)
	 * 
	 * @param record
	 * @return
	 */
	int updateByPrimaryKey(File record);

	/**
	 * 查找父文件下的所有子文件
	 * 
	 * @param id
	 * @return
	 */
	List selectAllFile(int id);

	/**
	 * 獲取文件列表
	 * 
	 * @param userId
	 * @param object
	 * @return
	 */
	List<File> fileLists(Map<String, Object> map);

	/**
	 * 获取类目的列表的文件
	 * 
	 * @param map
	 * @return
	 */
	List<File> categoryLists(Map<String, Object> map);

	/**
	 * 得到搜索的文件
	 * 
	 * @param map
	 * @return
	 */
	List<File> searchFileLists(Map<String, Object> map);
	
	/**
	 * 根据文件名搜索文件
	 * @param filename
	 * @return
	 */
	File searchFileByFileName(String filename);

	/**
	 * 回收站文件
	 * 
	 * @param map2
	 * @return
	 */
	List<File> trashFileLists(Map<String, Object> map2);

	/**
	 * 文件排序
	 * @param map
	 * @return
	 */
	List<File> groupFileLists(Map<String, Object> map);

}