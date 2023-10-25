import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { course_catalog } from "../data";
import * as moment from 'moment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hostElement: any;
  svg: any;
  g: any;
  colors = d3.scaleOrdinal(d3.schemeTableau10);
  data: any = course_catalog;
  startTime: any = moment("07:00", 'HH:mm').format();
  endTime: any = moment("20:00", 'HH:mm').format();
  daysRange: any = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  margin = { top: 30, right: 30, bottom: 30, left: 50 };
  height = 1500;
  width = 900;
  barWidth = 600;
  barStyle = {
    background: '#616161',
    textColor: 'white',
    width: this.barWidth,
    startPadding: 2,
    endPadding: 3,
    radius: 3
  };
  yScale: any;
  xScale: any;
  yAxis: any;
  leftGridlines: any;
  lecBarGroup: any;
  tutBarGroup: any;

  lectureData:any = [];
  discussionData:any = [];


  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  remappingData(){
    this.data.data.forEach((item:any) => {
      let lecMapping = item.lectureDetail.dayTimes.map((el:any)=>{
        el.subjectCode= item.subjectCode,
        el.courseCode= item.courseCode,
        el.title= item.title
        return el;
      });
      this.lectureData.push([].concat.apply([], lecMapping))
      // this.discussionData
    });
    this.lectureData = [].concat.apply([], this.lectureData)

    this.data.data.forEach((item:any) => {
      let tutMapping = item.discussionDetail.dayTimes.map((el:any)=>{
        el.subjectCode= item.subjectCode,
        el.courseCode= item.courseCode,
        el.title= item.title
        return el;
      });
      this.discussionData.push([].concat.apply([], tutMapping))
      // this.discussionData
    });
    this.discussionData = [].concat.apply([], this.discussionData)
    console.log("dissss", this.discussionData)
  }



  ngOnInit(): void {
    this.remappingData();
    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.yScale = d3.scaleTime()
      .domain([new Date(this.startTime), new Date(this.endTime)])
      .range([this.margin.top, this.height - this.margin.bottom]);

    this.xScale = d3.scaleBand()
      .domain(this.daysRange)
      .range([this.margin.left, this.width-this.margin.right]);

    this.svg.selectAll("text")
      .data(this.daysRange)
      .enter()
      .append("text")
      .text((d:any) => d)
      .attr("x", (d:any) => this.xScale(d) + this.xScale.bandwidth() / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle");

    this.yAxis = d3.axisLeft(this.yScale).tickFormat((t: any) => {
      return d3.timeFormat("%H:%M")(new Date(t));
    });

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .attr('opacity', 0.5)
      .call(this.yAxis);

    this.leftGridlines = d3.axisLeft(this.yScale)
      .tickSize(-this.width - 10)
      .tickFormat((d: any, i: any) => { return ""; });

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .attr('opacity', 0.3)
      .call(this.leftGridlines);

    this.lecBarGroup = this.svg.selectAll('g.lecBarGroup')
      .data(this.lectureData)
      .join('g')
      .attr('class', 'lecBarGroup');

    this.lecBarGroup
      .append('rect')
      .attr('fill', (d:any) => this.colors(d.subjectCode+d.courseCode))
      .attr('x', (d:any) => this.xScale(d.day))
      .attr('y', (d:any) => this.yScale(new Date(moment(d.startTime, 'HH:mm').format())))
      .attr('height', (d:any) => {
        const startPoint = this.yScale(new Date(moment(d.startTime, 'HH:mm').format()));
        const endPoint = this.yScale(new Date(moment(d.endTime, 'HH:mm').format()))
        return (
          endPoint - startPoint //- this.barStyle.endPadding - this.barStyle.startPadding
        );
      })
      .attr('opacity', 0.3)
      .attr('width', this.xScale.bandwidth()-3)
      .attr('rx', this.barStyle.radius)
      .style("display", (d:any) => (d.selected ? "block" : "none"));

    this.lecBarGroup.selectAll("text")
      .data(this.lectureData)
      .enter()
      .append("text")
      .text((d:any) => d.subjectCode + " " + d.courseCode)
      .attr('x', (d:any) => this.xScale(d.day)+50)
      .attr('y', (d:any) => this.yScale(new Date(moment(d.startTime, 'HH:mm').format()))+20)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .style("display", (d:any) => (d.selected ? "block" : "none"));;

   const groupedData = d3.groups(this.discussionData, (d:any) => `${this.xScale(d.day)}-${this.yScale(new Date(moment(d.startTime, 'HH:mm').format()))}`);

    this.tutBarGroup = this.svg.selectAll('g.tutBarGroup')
      .data(this.discussionData)
      .join('g')
      .attr('class', 'tutBarGroup');
  

    this.tutBarGroup
    // .selectAll("tutBarGroup")
    //   .data((d:any) => d[1])
    //   .enter()
      .append("rect")
      .attr('fill', (d:any) => this.colors(d.subjectCode +d.courseCode))
      .attr('x', (d:any, i:any) => this.xScale(d.day))
      .attr('y', (d:any) => this.yScale(new Date(moment(d.startTime, 'HH:mm').format())))
      .attr('height', (d:any) => {
        const startPoint = this.yScale(new Date(moment(d.startTime, 'HH:mm').format()));
        const endPoint = this.yScale(new Date(moment(d.endTime, 'HH:mm').format()))
        return (
          endPoint - startPoint //- this.barStyle.endPadding - this.barStyle.startPadding
        );
      })
      .attr('opacity', 0.3)
      .attr('width', ((this.xScale.bandwidth()-3)))
      .attr('rx', this.barStyle.radius)
      .style("display", (d:any) => (d.selected ? "block" : "none"));

      this.tutBarGroup.on("click",  (event:any, d:any) => {
        // Toggle the clicked rect's color
        // console.log("eventttt", event, d)
        const target = event.target;
        console.log("target", target)
        // let currentColor = d3.select(target).attr('fill')
        // console.log("target", d3.select(target).attr('fill'))
        // d3.select(target).attr("fill", darkenColor(currentColor, 0.7));
      
        // Make all other rects lighter
        this.tutBarGroup.each(function (otherRectData:any) {
          if (!otherRectData.selected && (otherRectData.subjectCode===d.subjectCode) && (otherRectData.courseCode === d.courseCode)) {
            otherRectData.selected = true;
            d3.select(otherRectData).datum()
            //d3.select(target2).attr("fill", "light" + otherRectData.color);
          }
        });
      });

      this.tutBarGroup.selectAll("text")
      .data(this.discussionData)
      .enter()
      .append("text")
      .text((d:any) => d.subjectCode + " " + d.courseCode)
      .attr('x', (d:any) => this.xScale(d.day)+50)
      .attr('y', (d:any) => this.yScale(new Date(moment(d.startTime, 'HH:mm').format()))+20)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .style("display", (d:any) => (d.selected ? "block" : "none"));;

  }

}
function darkenColor(color:any, factor:any) {
  // Parse the input color string to extract its components
  const parsedColor:any = d3.color(color);

  if (!parsedColor) {
    // Invalid color format, return the original color
    return color;
  }

  // Calculate the new lightness component
  const newLightness = parsedColor.l - factor;

  // Ensure the new lightness is within the valid range [0, 1]
  const clampedLightness = Math.max(0, Math.min(1, newLightness));

  // Set the new lightness component
  parsedColor.l = clampedLightness;

  // Return the modified color as a string
  return parsedColor.toString();
}

