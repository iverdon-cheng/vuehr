<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索……" size="small" style="width: 300px;margin-right: 10px"
                          clearable
                          @clear="initEmps"
                          icon="el-icon-search" v-model="keywords" @keydown.enter.native="initEmps"></el-input>
                <el-button icon="el-icon-search" type="primary" size="small" @click="initEmps">搜索</el-button>
                <el-button type="primary" size="small">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success" size="small">
                    <i class="fa fa-level-up" aria-hidden="true"></i>导入数据</el-button>
                <el-button type="success" size="small">
                    <i class="fa fa-level-down" aria-hidden="true"></i>导出数据</el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="showAddEmpView">添加员工</el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    size="mini"
                    :data="emps"
                    stripe
                    border
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    style="width: 100%; font-size: 13px">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        width="100"
                        align="left"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        width="180"
                        align="left"
                        label="身份证号码">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        width="80"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        width="50"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        width="80"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="120"
                        align="left"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="220"
                        align="left"
                        label="联系地址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        width="100"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        width="100"
                        label="职位">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        width="110"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        width="100"
                        align="left"
                        label="聘用形式">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        width="80"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        width="150"
                        align="left"
                        label="专业">
                </el-table-column>
                <el-table-column
                        prop="school"
                        width="150"
                        align="left"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        width="100"
                        align="left"
                        label="入职日期">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        width="100"
                        align="left"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        width="100"
                        align="left"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        width="100"
                        align="left"
                        label="合同截止日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        align="left"
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex; justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="添加员工"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input style="width: 150px" placeholder="请输入员工姓名" prefix-icon="el-icon-edit" v-model="emp.name" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender" size="mini">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="0" style="margin-left: 0px">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birth">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 150px"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input style="width: 120px" placeholder="请输入籍贯" prefix-icon="el-icon-edit" v-model="emp.nativePlace" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input style="width: 150px" placeholder="请输入电子邮箱" prefix-icon="el-icon-message" v-model="emp.email" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input style="width: 200px" placeholder="请输入联系地址" prefix-icon="el-icon-edit" v-model="emp.address" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posId">
                                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称:" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="民族" size="mini" style="width: 120px">
                                    <el-option
                                            v-for="item in jobLevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentId">
<!--                                <el-input style="width: 150px" placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" v-model="emp.departmentId" size="mini"></el-input>-->
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="200"
                                        trigger="manual"
                                        v-model="popVisible2">
                                    <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                             @node-click="searvhViewHandleNodeClick"></el-tree>
                                    <div slot="reference"
                                         style="width: 130px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box;margin-left: 3px"
                                         @click="showDepView2">{{inputDepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="address">
                                <el-input style="width: 200px" placeholder="请输入电话号码" prefix-icon="el-icon-phone" v-model="emp.phone" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workID">
                                <el-input style="width: 150px" placeholder="工号" prefix-icon="el-icon-edit" v-model="emp.workID" size="mini" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 120px">
                                    <el-option
                                            v-for="item in tiptopDegree"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input style="width: 150px" placeholder="毕业院校名称" prefix-icon="el-icon-edit" v-model="emp.school" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input style="width: 200px" placeholder="请输入专业名称" prefix-icon="el-icon-edit" v-model="emp.specialty" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="转正日期:" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="合同终止日期:" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 150px"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input style="width: 180px" placeholder="工号" prefix-icon="el-icon-edit" v-model="emp.idCard" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同形式:" prop="gender">
                                <el-radio-group v-model="emp.engageForm" size="mini">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="gender">
                                <el-radio-group v-model="emp.wedlock" size="mini">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button></span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data(){
            return{
                popVisible: false,
                popVisible2: false,
                dialogVisible:false,
                emps:[],
                loading:false,
                total:0,
                page:1,
                size:10,
                keywords:'',
                emp:{
                    name: "",
                    gender: "",
                    birthday: "",
                    idCard: "",
                    wedlock: "",
                    nationId: '',
                    nativePlace: "",
                    politicId: '',
                    email: "",
                    phone: "",
                    address: "",
                    departmentId: '',
                    jobLevelId: '',
                    posId: '',
                    engageForm: "",
                    tiptopDegree: "",
                    specialty: "",
                    workID: "",
                    contractTerm: '',
                    school: "",
                    beginDate: "",
                    workState: "",
                    conversionTime: '',
                    notWorkDate: null,
                    beginContract: "",
                    endContract: "",
                    workAge: null
                },
                nations:[],
                jobLevels:[],
                politicsstatus:[],
                positions:[],
                tiptopDegree:['本科','大专','硕士','博士','高中','初中','小学','其他']
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
        },
        methods:{
            searvhViewHandleNodeClick(data) {
                this.inputDepName = data.name;
                this.searchValue.departmentId = data.id;
                this.popVisible2 = !this.popVisible2
            },
            showDepView(){

            },
            getMaxWorkID(){
              this.getRequest("/emp/basic/maxWorkID").then(resp=>{
                  if (resp){
                      this.emp.workID = resp.obj;
                  }
              })
            },
            initPositions(){
              this.getRequest("/emp/basic/positions").then(resp=>{
                  this.positions=resp;
              })
            },
            initData(){
              if (!window.sessionStorage.getItem("nations")){
                this.getRequest('/emp/basic/nations').then(resp=>{
                    if (resp){
                        this.nations=resp;
                    }
                })
              };
              if (!window.sessionStorage.getItem("jobLevels")){
                    this.getRequest('/emp/basic/jobLevels').then(resp=>{
                        if (resp){
                            this.jobLevels=resp;
                        }
                    })
              };
              if (!window.sessionStorage.getItem("politicsstatus")){
                    this.getRequest('/emp/basic/politicsstatus').then(resp=>{
                        if (resp){
                            this.politicsstatus=resp;
                        }
                    })
              }
            },
            showAddEmpView(){
                this.dialogVisible=true;
                this.initPositions();
                this.getMaxWorkID();
            },
            sizeChange(currentSize){
                this.size=currentSize;
                this.initEmps();
            },
            initEmps(){
              this.loading=true;
              this.getRequest("/emp/basic/?page="+this.page+"&size="+this.size+"&keywords="+encodeURI(this.keywords)).then(resp=>{
                  this.loading=false;
                  if (resp){
                      this.emps=resp.data;
                      this.total=resp.total;
                  }
              })
            },
            currentChange(currentPage){
              this.page = currentPage;
              this.initEmps();
            }
        }
    }
</script>

<style scoped>

</style>