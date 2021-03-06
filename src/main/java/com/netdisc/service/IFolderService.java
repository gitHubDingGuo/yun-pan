package com.netdisc.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.netdisc.vo.CapacityVo;
import com.netdisc.vo.Folder_File;
import com.netdisc.pojo.FileVo;

import com.netdisc.pojo.Folder;

 /**
 * @author zero
 * @date 2019年8月29日
 * @version
 */
public interface IFolderService {

	/**
	 *登录 获取文件和文件夹的列表
	 * @param userId
	 * @param id
	 * @return
	 */
	List<FileVo> folder_fileLists1(String userId, Integer id);
	
	/**
	 * 获取子文件夹和文件
	 * @param userId
	 * @param id
	 * @return
	 */
	 List<FileVo> folder_fileLists2(String userId, Integer id);
	 
	 /**
	  * 获取子文件夹和子文件
	 * @param userId
	 * @param id
	 * @return
	 */
	 Folder_File folder_fileLists3(String userId, Integer id);
	 
	 
	 /**
	  * 查看文件
	 * @param parentId
	 * @return
	 */
	FileVo findFileByFid(Integer parentId);

	 
	/**
	 * 添加文件夹
	 * @param record
	 * @return
	 */
	void insertSelective(String fname,String userId,int id);
	
	/**
	 * 逻辑删除文件夹	
	 * @param folderId
	 */
	void deleteFolder(int folderId,int status);
	/**
	 * 逻辑多选删除文件夹和文件	
	 * @param folderId
	 */
	void deleteFolderList(String fids,String fileName,int status);
	
	/**
	 * 重命名文件夹或者文件
	 * @param folderId
	 * @param folderName
	 */
	void updateFolderAndFile(int folderId,String folderName);

	/**
	  * 找到分类的文件
	 * @param userId
	 * @param type
	 * @return
	 */
	List<FileVo> categoryLists(String userId, Integer type);

	/**
	 * 通过搜索得到的文件夹和文件
	 * @param userId
	 * @param type
	 * @return
	 */
	List<FileVo> searchLists(String userId, String type);

	/**回收站文件
	 * @param userId
	 * @param i
	 * @return
	 */
	List<FileVo> trashLists(String userId, Integer i);

	/**
	 * 查找的内容的排序
	 * @param userId
	 * @param type
	 * @return
	 */
	List<FileVo> group(String userId, String type,String searchContext);



}
