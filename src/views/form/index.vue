<template>
  <div class="app-container">
    <div id="myChart" style="width: 95vw;height: 50vh;" />
    <el-divider />
    <el-input
      v-model="searchingTitle"
      size="medium"
      placeholder="输入电影名称进行查询"
      suffix-icon="el-icon-edit"
      style="width:40vh; margin-bottom:10px"
    />
    <el-button icon="el-icon-search" circle style="margin-left:10px" @click="searchMovieByTitle" />
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      style="width: 100%"
      border
      :stripe="true"
      @row-click="clickRowForConflictMovie"
    >
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :label="item.label"
        :property="item.property"
        align="center"
      />
    </el-table>
    <div class="block">
      <el-pagination
        style="text-align: center"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-count="totalPage - 1"
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      />
    </div>
    <el-dialog title="电影溯源信息" :visible.sync="dialogFlag">
      <div style="text-align: center; font-size: xx-large; margin-bottom: 8px">{{ dialogData.movieTitle }}</div>
      <div style="text-align: center; margin-bottom: 8px;">共合并 <span style="font-size: x-large">{{ dialogData.versionCount }}</span> 个版本数量的电影,点击表格每一行可访问源网址</div>
      <div style="text-align: center">该电影版本信息来源评论数量共 <span style="font-size: x-large">{{ dialogData.commentCount }}</span> 条</div>
      <div style="text-align: left">以下为未合并前的电影数据信息:</div>
      <el-table :data="dialogMovieData" element-loading-text="拼命加载中" @row-click="clickForWebsite">
        <el-table-column
          v-for="(item,index) in movieHeader"
          :key="index"
          :label="item.label"
          :property="item.property"
          align="center"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetActorByMovieConflict, GetActorByMovieNoConflict,
  GetTraceabilityComment, GetTraceabilityConflictInfo,
  GetTraceabilityMissingAsin,
  GetTraceabilityMovie,
  GetTraceabilityMovieTvAsin, GetTraceabilitySearchingMovie, GetTraceabilityTotalCount, GetTraceabilityTvAsin
} from '@/api/MovieTraceability'
import Index from 'v-charts/src/packages/index'

export default {
  data() {
    return {
      commentHeader: [{ label: '评论编号', property: 'commentId' }, { label: '电影编号', property: 'asin' }, { label: '评论时间', property: 'reviewTime' },
        { label: '评论内容', property: 'reviewText' }, { label: '评论总结', property: 'summary' }],

      consolidationHeader: [{ label: '电影编号', property: 'asin' }, { label: '电影名称', property: 'movieTitle' }, { label: '电影分数', property: 'movieScore' },
        { label: '导演', property: 'director' }, { label: '演员', property: 'actor' }, { label: '主演', property: 'mainActor' }, { label: '电影类别', property: 'movieCategory' },
        { label: '电影发布时间', property: 'movieReleaseDate' }, { label: '评论数量', property: 'commentNum' }, { label: '电影版本数量', property: 'asinCount' }],

      asinHeader: [{ label: '电影编号', property: 'asin' }],

      movieHeader: [{ label: '电影编号', property: 'asin' }, { label: '电影名称', property: 'movieTitle' }, { label: '电影分数', property: 'movieScore' },
        { label: '导演', property: 'director' }, { label: '演员', property: 'actor' }, { label: '主演', property: 'mainActor' }, { label: '电影类别', property: 'movieCategory' },
        { label: '电影发布时间', property: 'movieReleaseDate' }, { label: '评论数量', property: 'commentNum' }],

      tableHeader: [],

      tableData: [],

      loading: false,

      totalPage: 0,
      pageSize: 6,
      currentPage: 1,
      currentName: '',

      dataCount: {},

      // dialog
      dialogFlag: false,
      dialogData: [],
      dialogMovieData: [],

      // searching
      searchingTitle: ''
    }
  },
  watch: {
    currentPage(val, oldVal) {
      if (this.currentName === '模糊搜索') {
        this.getData(val - 1, this.pageSize, this.searchingTitle)
      } else {
        this.getData(val - 1, this.pageSize)
      }
    }

  },
  created() {
    // 获得图表中数据的值
    this.getTotalCount()
  },
  methods: {
    getComment(currentPage, pageSize) {
      GetTraceabilityComment(currentPage + 1, pageSize)
        .then(response => {
          console.log(response)
          this.totalPage = response.data.totalPage
          this.tableData = response.data.commentList
          this.loading = false
        }).catch(function(error) {
          console.log(error)
        })
    },
    getMovieTvAsin(currentPage, pageSize) {
      GetTraceabilityMovieTvAsin(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.asinList
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    getMissingAsin(currentPage, pageSize) {
      GetTraceabilityMissingAsin(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.missingMovieAsin
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    getMovie(currentPage, pageSize) {
      GetTraceabilityMovie(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.movieList
        this.loading = false
        console.log(this.tableData)
      }).catch(function(error) {
        console.log(error)
      })
    },
    getConflictConsolidationMovie(currentPage, pageSize) {
      GetActorByMovieConflict(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.consolidationMovieList
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    getNoConflictConsolidationMovie(currentPage, pageSize) {
      GetActorByMovieNoConflict(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.consolidationMovieList
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    getTvAsin(currentPage, pageSize) {
      GetTraceabilityTvAsin(currentPage + 1, pageSize).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.tvAsinList
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    getTotalCount() {
      GetTraceabilityTotalCount().then(response => {
        this.dataCount = response.data
        this.createChart()
      }).catch(function(error) {
        console.log(error)
      })
    },
    getMovieByTitle(currentPage, pageSize, title) {
      GetTraceabilitySearchingMovie(currentPage + 1, pageSize, title).then(response => {
        console.log(response)
        this.totalPage = response.data.totalPage
        this.tableData = response.data.consolidationMovieList
        this.loading = false
      }).catch(function(error) {
        console.log(error)
      })
    },
    createChart() {
      const myChart = this.$echarts.init(document.getElementById('myChart'))

      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },

        series: {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency'
          },
          selectedMode: 'single',
          select: {
            show: true,
            position: 'top'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.5
          },
          data: [
            {
              name: '评论数据'
            },
            {
              name: 'Amazon数据'
            },
            {
              name: '404数据'
            },
            {
              name: '电影数据'
            },
            {
              name: '非电影数据'
            },
            {
              name: '合并后不存在冲突数据'
            },
            {
              name: '合并后存在冲突数据'
            }
          ],
          links: [
            {
              source: '评论数据',
              target: 'Amazon数据',
              value: this.dataCount['movieTvAsinCount']
            },
            {
              source: '评论数据',
              target: '404数据',
              value: this.dataCount['missingAsinCount']
            },
            {
              source: 'Amazon数据',
              target: '电影数据',
              value: this.dataCount['movieCount']
            },
            {
              source: 'Amazon数据',
              target: '非电影数据',
              value: this.dataCount['tvAsinCount']
            },
            {
              source: '电影数据',
              target: '合并后存在冲突数据',
              value: this.dataCount['conflictConsolidationMovieCount']
            },
            {
              source: '电影数据',
              target: '合并后不存在冲突数据',
              value: this.dataCount['noConflictConsolidationMovieCount']
            }
          ]
        }
      }
      // 绘制图表
      myChart.setOption(option)
      console.log('初始化点击事件')

      myChart.on('click', param => {
        console.log(param)
        this.currentName = param.data['name']
        this.searchingTitle = ''
        if (this.currentPage === 1) {
          this.getData(this.currentPage - 1, this.pageSize)
        } else {
          this.currentPage = 1
        }
      })
    },
    getData(currentPage, pageSize, title) {
      if (this.currentName === '评论数据') {
        this.loading = true
        this.tableHeader = this.commentHeader
        this.getComment(currentPage, pageSize)
      } else if (this.currentName === 'Amazon数据') {
        this.loading = true
        this.tableHeader = this.asinHeader
        this.getMovieTvAsin(currentPage, pageSize)
      } else if (this.currentName === '404数据') {
        this.loading = true
        this.tableHeader = this.asinHeader
        this.getMissingAsin(currentPage, pageSize)
      } else if (this.currentName === '电影数据') {
        this.loading = true
        this.tableHeader = this.movieHeader
        this.getMovie(currentPage, pageSize)
      } else if (this.currentName === '非电影数据') {
        this.loading = true
        this.tableHeader = this.asinHeader
        this.getTvAsin(currentPage, pageSize)
      } else if (this.currentName === '合并后存在冲突数据') {
        this.loading = true
        this.tableHeader = this.consolidationHeader
        this.getConflictConsolidationMovie(currentPage, pageSize)
      } else if (this.currentName === '合并后不存在冲突数据') {
        this.loading = true
        this.tableHeader = this.consolidationHeader
        this.getNoConflictConsolidationMovie(currentPage, pageSize)
      } else if (this.currentName === '模糊搜索') {
        this.loading = true
        this.tableHeader = this.consolidationHeader
        this.getMovieByTitle(currentPage, pageSize, title)
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handlePrevClick(val) {
      this.currentPage = val
    },
    handleNextClick(val) {
      this.currentPage = val
    },
    clickRowForConflictMovie(row, event, column) {
      if (this.tableHeader === this.consolidationHeader && row['asinCount'] !== 1) {
        console.log(row['asin'])
        // 首先调用获得冲突信息
        // 展示dialog
        GetTraceabilityConflictInfo(row['asin']).then(response => {
          this.dialogData = response.data
          this.dialogMovieData = this.dialogData.movieList
          this.dialogData['movieTitle'] = row['movieTitle']
          this.dialogData['movieInfo'] = row
          this.dialogFlag = true
        }).catch(function(error) {
          console.log(error)
        })
      } else {
        const curAsin = row['asin']
        window.open('https:www.amazon.com/dp/' + curAsin)
      }
    },
    // cellStyle({row, column, rowIndex, columnIndex}){
    //   //改变颜色
    //   let movieInfo = this.dialogData.movieInfo
    //   if(row["movieTitle"] === movieInfo["movieTitle"] && columnIndex === 1){
    //     return 'color: #EA1B29';
    //   }
    //   else if(row["director"] === movieInfo["director"] && columnIndex === 3){
    //     return 'color: #EA1B29';
    //   }
    //   else if(row["actor"] === movieInfo["actor"] && columnIndex === 4){
    //     return 'color: #EA1B29';
    //   }
    //   else if(row["mainActor"] === movieInfo["mainActor"] && columnIndex === 5){
    //     return 'color: #EA1B29';
    //   }
    //   else if(row["movieReleaseDate"] === movieInfo["movieReleaseDate"] && columnIndex === 7){
    //     return 'color: #EA1B29';
    //   }
    // },
    clickForWebsite(row, event, column) {
      const curAsin = row['asin']
      window.open('https:www.amazon.com/dp/' + curAsin)
    },
    searchMovieByTitle() {
      if (this.searchingTitle === '') {
        // 不为空
        return
      }
      this.currentName = '模糊搜索'
      if (this.currentPage === 1) {
        this.getData(this.currentPage - 1, this.pageSize, this.searchingTitle)
      } else {
        this.currentPage = 1
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

