package com.netdisc.vo;

import java.util.Date;
import java.util.List;

import com.netdisc.pojo.File;
import com.netdisc.pojo.FileVo;
import com.netdisc.pojo.Folder;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Folder_File {

	private List<FileVo> parent;
	private List<FileVo> files;
}
