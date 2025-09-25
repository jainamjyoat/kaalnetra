"use client";
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <div className="container noselect">
        <label htmlFor="checkbox" id="clickHandler" />
        <input type="checkbox" id="checkbox" />
        <button id="button">
          <p id="to-launch">Let's Launch!</p>
          <p id="tag">by kennyotsu &lt;3</p>
          <div id="platform" />
          <div className="caution">
            <div id="caution-left">LAUNCH ZONE</div>
            <div id="caution-right">LAUNCH ZONE</div>
          </div>
        </button>
        <p id="to-hover"></p>
        <div id="shuttle-wrapper">
          <div id="shadow" />
          <svg viewBox="0 0 230.24 542.46" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="b"><defs><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(160.35 -471.85) rotate(-7.06) scale(1.56 1.68)" y2="549.77" x2="-104.11" y1="545.09" x1="-130.63" id="d"><stop stopColor="#c6c6c6" offset={0} /><stop stopColor="#b1b1b1" offset={0} /><stop stopColor="#858585" offset=".02" /><stop stopColor="#606060" offset=".04" /><stop stopColor="#424242" offset=".05" /><stop stopColor="#2a2a2a" offset=".07" /><stop stopColor="#191919" offset=".09" /><stop stopColor="#101010" offset=".1" /><stop stopColor="#0d0d0d" offset=".13" /><stop stopColor="#454545" offset=".31" /><stop stopColor="#4c4c4c" offset=".33" /><stop stopColor="#484848" offset=".35" /><stop stopColor="#2b2c2b" offset=".52" /><stop stopColor="#171817" offset=".68" /><stop stopColor="#0b0c0b" offset=".84" /><stop stopColor="#070807" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="479.08" x2="113.37" y1="475.4" x1="70.56" id="e"><stop stopOpacity={0} stopColor="#fff" offset={0} /><stop stopOpacity={0} stopColor="#fff" offset=".32" /><stop stopOpacity={0} stopColor="#fff" offset=".38" /><stop stopOpacity={0} stopColor="#b3511b" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="270.33" x2="123.89" y1="269.31" x1="65.74" id="f"><stop stopColor="#e5e5e5" offset={0} /><stop stopColor="#e3e3e3" offset=".63" /><stop stopColor="#dcdcdc" offset=".85" /><stop stopColor="#d3d2d3" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="114.99" x2="112.45" y1="114.99" x1="70.84" id="g"><stop stopColor="#1a1a1a" offset={0} /><stop stopColor="#2a2a2a" offset=".05" /><stop stopColor="#434343" offset=".15" /><stop stopColor="#4d4d4d" offset=".2" /><stop stopColor="#474747" offset=".3" /><stop stopColor="#383838" offset=".69" /><stop stopColor="#333" offset={1} /></linearGradient><linearGradient xlinkHref="#g" y2="142.07" x2="112.45" y1="142.07" x1="70.84" id="h" /><linearGradient xlinkHref="#g" y2="178.73" x2="112.45" y1="178.73" x1="70.84" id="i" /><linearGradient xlinkHref="#g" y2="254.03" x2="112.45" y1="254.03" x1="70.84" id="j" /><linearGradient xlinkHref="#g" y2="329.25" x2="112.45" y1="329.25" x1="70.84" id="k" /><linearGradient xlinkHref="#g" y2="386.88" x2="112.45" y1="386.88" x1="70.84" id="l" /><linearGradient xlinkHref="#g" y2="407.2" x2="112.45" y1="407.2" x1="70.84" id="m" /><linearGradient xlinkHref="#g" y2="414.79" x2="112.45" y1="414.79" x1="70.84" id="n" /><linearGradient xlinkHref="#g" y2="423.88" x2="112.45" y1="423.88" x1="70.84" id="o" /><linearGradient xlinkHref="#g" y2="435.68" x2="112.45" y1="435.68" x1="70.84" id="p" /><linearGradient xlinkHref="#g" y2="446.33" x2="112.45" y1="446.33" x1="70.84" id="q" /><linearGradient gradientUnits="userSpaceOnUse" y2="280.59" x2="112.45" y1="280.59" x1="70.67" id="r"><stop stopOpacity={0} stopColor="#fff" offset={0} /><stop stopOpacity={0} stopColor="#fff" offset=".14" /><stop stopOpacity=".03" stopColor="#fff" offset=".19" /><stop stopOpacity=".08" stopColor="#fff" offset=".23" /><stop stopOpacity=".15" stopColor="#fff" offset=".25" /><stop stopOpacity=".23" stopColor="#fff" offset=".28" /><stop stopOpacity=".34" stopColor="#fff" offset=".3" /><stop stopOpacity=".47" stopColor="#fff" offset=".32" /><stop stopOpacity=".61" stopColor="#fff" offset=".34" /><stop stopOpacity=".78" stopColor="#fff" offset=".36" /><stop stopOpacity=".8" stopColor="#fff" offset=".36" /><stop stopOpacity={0} stopColor="#fff" offset=".38" /><stop stopOpacity={0} stopColor="#b3511b" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="464.45" x2="120.43" y1="455.38" x1="63.17" id="s"><stop stopOpacity={0} stopColor="#fff" offset={0} /><stop stopOpacity={0} stopColor="#fff" offset=".15" /><stop stopOpacity=".03" stopColor="#fff" offset=".2" /><stop stopOpacity=".08" stopColor="#fff" offset=".24" /><stop stopOpacity=".15" stopColor="#fff" offset=".27" /><stop stopOpacity=".23" stopColor="#fff" offset=".29" /><stop stopOpacity=".34" stopColor="#fff" offset=".32" /><stop stopOpacity=".47" stopColor="#fff" offset=".34" /><stop stopOpacity=".61" stopColor="#fff" offset=".36" /><stop stopOpacity=".78" stopColor="#fff" offset=".38" /><stop stopOpacity=".8" stopColor="#fff" offset=".38" /><stop stopOpacity={0} stopColor="#fff" offset=".39" /><stop stopColor="#d3d3d3" offset=".72" /><stop stopColor="#d2d1d2" offset={1} /></linearGradient><linearGradient xlinkHref="#r" y2="91.43" x2="115.35" y1="87.78" x1="72.87" id="t" /><linearGradient gradientUnits="userSpaceOnUse" y2="217.5" x2="194.16" y1="217.5" x1="102.87" id="v"><stop stopColor="#d68029" offset={0} /><stop stopColor="#b3511b" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="404.51" x2="158.77" y1="23.53" x1="134.44" id="w"><stop stopOpacity=".4" stopColor="#dd884e" offset=".02" /><stop stopOpacity=".67" stopColor="#b76031" offset=".42" /><stop stopColor="#882e0d" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2={162} x2="194.16" y1={162} x1="102.66" id="x"><stop stopColor="#d8823a" offset={0} /><stop stopColor="#bf611e" offset={1} /></linearGradient><radialGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(119.12 192.29) rotate(-104.58) scale(1 .55)" r="134.05" fy="71.95" fx="60.36" cy="64.81" cx="122.52" id="y"><stop stopOpacity={0} stopColor="#dd884e" offset=".72" /><stop stopColor="#ed9654" offset={1} /></radialGradient><radialGradient xlinkHref="#y" gradientTransform="translate(176.37 200.83) rotate(-75.42) scale(1 -.55)" r="133.29" fy="72.72" fx="68.57" cy="65.62" cx="130.39" id="z" /><linearGradient gradientUnits="userSpaceOnUse" y2="217.56" x2="142.83" y1="438.65" x1="161.35" id="aa"><stop stopColor="#a52c14" offset={0} /><stop stopOpacity=".84" stopColor="#a53014" offset=".19" /><stop stopOpacity=".44" stopColor="#a73b14" offset=".59" /><stop stopOpacity={0} stopColor="#aa4814" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(189.08 .72) rotate(.18) scale(1.34 1)" y2="285.84" x2="-7.1" y1="284.22" x1="-43.8" id="ab"><stop stopOpacity={0} stopColor="#e65900" offset={0} /><stop stopOpacity=".03" stopColor="#e45800" offset=".13" /><stop stopOpacity=".12" stopColor="#de5502" offset=".29" /><stop stopOpacity=".27" stopColor="#d55104" offset=".46" /><stop stopOpacity=".48" stopColor="#c84b08" offset=".65" /><stop stopOpacity=".75" stopColor="#b7430c" offset=".84" /><stop stopColor="#a83c11" offset={1} /></linearGradient><linearGradient xlinkHref="#d" y2="591.23" x2="-38.94" y1="586.55" x1="-65.46" id="ac" /><linearGradient xlinkHref="#e" y2="535.79" x2="222.95" y1="532.12" x1="180.14" id="ad" /><linearGradient gradientUnits="userSpaceOnUse" y2="327.04" x2="233.47" y1="326.03" x1="175.32" id="ae"><stop stopColor="#e5e5e5" offset={0} /><stop stopColor="#e5e5e5" offset=".04" /><stop stopColor="#e5e5e5" offset=".05" /><stop stopColor="#e3e3e3" offset=".63" /><stop stopColor="#dcdcdc" offset=".86" /><stop stopColor="#d3d2d3" offset={1} /></linearGradient><linearGradient xlinkHref="#g" y2="463.91" x2="222.03" y1="463.91" x1="180.42" id="af" /><linearGradient xlinkHref="#g" y2="471.51" x2="222.03" y1="471.51" x1="180.42" id="ag" /><linearGradient xlinkHref="#g" y2="480.59" x2="222.03" y1="480.59" x1="180.42" id="ah" /><linearGradient xlinkHref="#g" y2="492.4" x2="222.03" y1="492.4" x1="180.42" id="ai" /><linearGradient gradientUnits="userSpaceOnUse" y2="385.97" x2="222.04" y1="385.97" x1="180.43" id="aj"><stop stopColor="#d45300" offset={0} /><stop stopColor="#d35200" offset={0} /><stop stopColor="#995021" offset=".07" /><stop stopColor="#704e38" offset=".13" /><stop stopColor="#564d47" offset=".18" /><stop stopColor="#4d4d4d" offset=".2" /><stop stopColor="#474747" offset=".3" /><stop stopColor="#383838" offset=".69" /><stop stopColor="#333" offset={1} /></linearGradient><linearGradient xlinkHref="#aj" y2="443.6" y1="443.6" id="ak" /><linearGradient xlinkHref="#aj" y2="310.75" y1="310.75" id="al" /><linearGradient xlinkHref="#aj" y2="235.44" y1="235.44" id="am" /><linearGradient xlinkHref="#aj" y2="198.78" y1="198.78" id="an" /><linearGradient xlinkHref="#aj" y2="171.7" y1="171.7" id="ao" /><linearGradient xlinkHref="#g" y2="503.1" x2="222.03" y1="503.1" x1="180.42" id="ap" /><linearGradient xlinkHref="#r" y2="337.31" x2="222.03" y1="337.31" x1="180.25" id="aq" /><linearGradient xlinkHref="#s" y2="521.17" x2="230.01" y1="512.1" x1="172.75" id="ar" /><linearGradient xlinkHref="#r" y2="148.14" x2="224.93" y1="144.49" x1="182.45" id="as" /><linearGradient gradientUnits="userSpaceOnUse" y2={424} x2="68.43" y1="414.65" x1="33.58" id="at"><stop stopColor="#e8e8e8" offset={0} /><stop stopColor="#f2f2f2" offset=".02" /><stop stopColor="#fafafa" offset=".04" /><stop stopColor="#fdfdfd" offset=".09" /><stop stopColor="#ededed" offset=".18" /><stop stopColor="#d3d3d3" offset=".38" /><stop stopColor="silver" offset=".58" /><stop stopColor="#b5b5b5" offset=".78" /><stop stopColor="#b2b2b2" offset={1} /></linearGradient><linearGradient xlinkHref="#d" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" y2="466.58" x2="111.3" y1="461.9" x1="84.78" id="au" /><linearGradient xlinkHref="#d" gradientTransform="translate(108.68 -1.95) rotate(13.28)" y2="464.99" x2="78.06" y1="459.96" x1="49.55" id="av" /><linearGradient xlinkHref="#d" gradientTransform="translate(37.21 -2.14) rotate(4.64)" y2="468.28" x2="84.28" y1="465.78" x1="70.1" id="aw" /><linearGradient gradientUnits="userSpaceOnUse" y2="317.69" x2="185.62" y1="317.69" x1="17.4" id="ax"><stop stopColor="#d5d5d5" offset={0} /><stop stopColor="#d1d1d1" offset={1} /></linearGradient><filter filterUnits="userSpaceOnUse" id="ay"><feOffset dy={-6} dx={13} /><feGaussianBlur stdDeviation={6} result="az" /><feFlood floodOpacity=".3" floodColor="#333" /><feComposite operator="in" in2="az" /><feComposite in="SourceGraphic" /></filter><linearGradient gradientUnits="userSpaceOnUse" y2="307.1" x2="131.64" y1="302.93" x1="52.2" id="ba"><stop stopColor="#fff" offset={0} /><stop stopColor="#f9f9f9" offset=".06" /><stop stopColor="#f5f5f5" offset=".18" /><stop stopColor="#c7c7c7" offset=".37" /><stop stopColor="#c3c3c3" offset=".55" /><stop stopColor="#b9b9b9" offset=".7" /><stop stopColor="#b4b4b4" offset=".75" /><stop stopColor="#d3d3d3" offset=".94" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="427.46" x2="88.01" y1="180.46" x1="89.33" id="bb"><stop stopColor="#fff" offset={0} /><stop stopOpacity=".85" stopColor="#f7f8f8" offset=".07" /><stop stopOpacity=".65" stopColor="#eeefef" offset=".16" /><stop stopOpacity=".48" stopColor="#e5e7e7" offset=".26" /><stop stopOpacity=".33" stopColor="#dee0e1" offset=".37" /><stop stopOpacity=".21" stopColor="#d9dbdc" offset=".47" /><stop stopOpacity=".12" stopColor="#d4d7d8" offset=".58" /><stop stopOpacity=".05" stopColor="#d1d4d5" offset=".7" /><stop stopOpacity=".01" stopColor="#cfd2d3" offset=".83" /><stop stopOpacity={0} stopColor="#cfd2d3" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="413.58" x2="69.93" y1="523.99" x1="-.05" id="bc"><stop stopColor="#b8b7b7" offset={0} /><stop stopColor="#d1d0d0" offset=".4" /><stop stopColor="#fff" offset={1} /></linearGradient><linearGradient xlinkHref="#bc" y2="466.09" x2="44.69" y1="505.35" x1="19.81" id="bd" /><radialGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(261.63 273.14) rotate(125.14) scale(1 .88)" r="39.33" fy="217.89" fx="66.91" cy="217.89" cx="66.91" id="be"><stop stopColor="#565656" offset={0} /><stop stopColor="#484848" offset=".1" /><stop stopColor="#323232" offset=".3" /><stop stopColor="#2b2b2b" offset=".42" /><stop stopColor="#2b2b2b" offset=".51" /><stop stopColor="#2b2b2b" offset={1} /></radialGradient><linearGradient gradientUnits="userSpaceOnUse" y2="380.41" x2="126.25" y1="374.95" x1="129.28" id="bf"><stop stopColor="#fff" offset={0} /><stop stopColor="#fff" offset=".27" /><stop stopColor="#fff" offset=".32" /><stop stopColor="#fdfdfe" offset=".33" /><stop stopColor="#f6f8fd" offset=".33" /><stop stopColor="#eaeffc" offset=".33" /><stop stopColor="#d9e3f9" offset=".33" /><stop stopColor="#c2d2f6" offset=".34" /><stop stopColor="#a7bef3" offset=".34" /><stop stopColor="#86a6ee" offset=".34" /><stop stopColor="#628ae9" offset=".34" /><stop stopColor="#386ce4" offset=".34" /><stop stopColor="#376be4" offset=".34" /><stop stopColor="#3d6ade" offset=".68" /><stop stopColor="#dd4f38" offset=".69" /><stop stopColor="#ff4915" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="440.89" x2="97.61" y1="437.49" x1="65.52" id="bg"><stop stopColor="#e8e8e8" offset={0} /><stop stopColor="#f2f2f2" offset=".05" /><stop stopColor="#fafafa" offset=".13" /><stop stopColor="#fdfdfd" offset=".27" /><stop stopColor="#f2f2f2" offset=".36" /><stop stopColor="#c3c3c3" offset=".78" /><stop stopColor="#b2b2b2" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="198.33" x2="136.86" y1="176.68" x1="77.37" id="bh"><stop stopColor="#0e0a09" offset={0} /><stop stopColor="#0e0a09" offset={0} /><stop stopColor="#2a2828" offset=".08" /><stop stopColor="#3b3b3b" offset=".14" /><stop stopColor="#424242" offset=".19" /><stop stopColor="#303030" offset=".26" /><stop stopColor="#090909" offset=".37" /><stop stopColor="#0c0b09" offset=".53" /><stop stopColor="#16110c" offset=".66" /><stop stopColor="#261c11" offset=".78" /><stop stopColor="#3e2b18" offset=".89" /><stop stopColor="#5c3f21" offset=".99" /><stop stopColor="#604122" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="443.62" x2="81.11" y1="411.38" x1="79.7" id="bi"><stop stopOpacity=".5" stopColor="#fff" offset={0} /><stop stopOpacity=".38" stopColor="#fefefe" offset=".07" /><stop stopOpacity=".27" stopColor="#fefefe" offset=".17" /><stop stopOpacity=".17" stopColor="#fdfdfd" offset=".27" /><stop stopOpacity=".09" stopColor="#fdfdfd" offset=".38" /><stop stopOpacity=".04" stopColor="#fdfdfd" offset=".52" /><stop stopOpacity={0} stopColor="#fdfdfd" offset=".68" /><stop stopOpacity={0} stopColor="#fdfdfd" offset={1} /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(-8.09 4.61) rotate(-2.79)" y2="170.77" x2="91.3" y1="162.16" x1="94.5" id="bj"><stop stopColor="#3f3f3f" offset=".13" /><stop stopColor="#090909" offset={1} /></linearGradient><linearGradient xlinkHref="#bj" gradientTransform="translate(31.76 -5.44) rotate(5.03) scale(.81 1)" y2="171.47" x2="86.96" y1="164.53" x1="89.54" id="bk" /><linearGradient xlinkHref="#bj" gradientTransform="translate(-16.29 4.64) rotate(-2.49) scale(1.1 1)" y2="172.9" x2="94.31" y1="166.02" x1="96.87" id="bl" /></defs><g id="c"><g><path style={{fill: 'url(#d)'}} d="M103.28,444.18l8.98,31.12s-3.3,10.51-20.97,10.46c-17.68-.05-21.18-10.93-21.18-10.93l9.38-29.9,23.8-.74Z" /><path style={{fill: 'url(#e)'}} d="M91.32,474.9c16.6,0,20.97-4.48,20.97-4.48v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,4.48,20.64,4.48Z" /><path style={{fill: 'url(#f)'}} d="M70.84,127.87s-.02-17.57,0-20.15,14.01-38.61,16.18-44.26,6.7-5.39,8.75,0,16.68,41.99,16.68,43.93-.04,330.65,0,333.41,8.09,17.79,8.09,19.32,1.69,20.06-29.06,20.06-29.06-18.5-29.06-20.06,8.13-16.64,8.26-19.32,.17-312.94,.17-312.94Z" /><g><path style={{fill: 'url(#g)'}} d="M91.48,119.36c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#h)'}} d="M91.48,146.44c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#i)'}} d="M91.48,183.1c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#j)'}} d="M91.48,258.41c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#k)'}} d="M91.48,333.63c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#l)'}} d="M91.48,391.26c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#m)'}} d="M91.48,411.57c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#n)'}} d="M91.48,419.17c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#o)'}} d="M91.48,428.25c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#p)'}} d="M91.48,440.06c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#q)'}} d="M91.48,450.71c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /></g><path style={{fill: 'url(#r)'}} d="M70.84,127.87s-.02-17.57,0-20.15c.01-1.29,2.64,11.56,20.81,11.56s20.81-12.86,20.81-11.89c0,1.94-.04,330.65,0,333.41,.02,1.36-3.06,13.05-20.97,13.05s-20.87-11.69-20.81-13.05c.12-2.68,.17-312.94,.17-312.94Z" /><path style={{fill: 'url(#s)'}} d="M91.48,480.19c32.61,0,29.06-20.06,29.06-20.06l-8.1-18.08s-2.39,11.81-20.97,11.81-20.81-13.05-20.81-13.05l-8.26,19.32s-3.55,20.06,29.06,20.06Z" /><path style={{fill: 'url(#t)'}} d="M70.84,107.72s4.18,11.56,20.81,11.56,20.81-11.89,20.81-11.89c0,0-14.86-40.33-17.12-44.93s-6.38-3.6-7.87,0-16.63,45.27-16.63,45.27Z" /></g><g id="u"><path style={{fill: 'url(#v)'}} d="M131.16,17c2.99-4.19,17-17,18-17s12.08,8.58,17.78,17c14.22,21,27.22,38,27.22,62V411c0,33-92,31-91,0s-1-299,0-329,23-58,28-65Z" /><path style={{fill: 'url(#w)', opacity: '.22'}} d="M131.05,17c2.99-4.19,17-17,18-17s12.08,8.58,17.78,17c14.22,21,27.22,38,27.22,62V411c0,33-92,31-91,0s-1-299,0-329,23-58,28-65Z" /><path style={{fill: 'url(#x)'}} d="M102.66,117.5s6,24,45.5,24,46-24,46-24l-.5,74s-12.5,15-45,15-46-15-46-15V117.5Z" /><path style={{fill: 'url(#y)'}} d="M149.05,0s9.4,5.19,17.78,17,27.22,35.73,27.22,62,.11,38.5,.11,38.5c0,0-1.15,6.16-9.28,12.79-6.39,5.2-16.71,11.21-36.72,11.21-45.5,0,.89-141.5,.89-141.5Z" /><path style={{fill: 'url(#z)'}} d="M147.97,1.5s-9.4,5.19-17.78,17c-8.38,11.81-27.22,35.73-27.22,62,0,26.27-.11,38.5-.11,38.5,0,0,1.84,8.63,15.38,15.74,6.82,3.58,15.4,6.75,30.63,6.75,45.5,0-.9-140-.9-140Z" /><path style={{fill: 'url(#aa)'}} d="M105.66,209.83l-2.46,202.5s.23,32.96,46.76,33.93c43.35,.91,46.66-21.97,46.66-21.97l.11-231.42-91.07,16.96Z" /><path style={{fill: 'url(#ab)'}} d="M193.63,138.78s-2.38,275.86-2.31,278.63c.03,1.35-9.7,16.7-33.71,16.62s-33.8-23.73-33.71-25.09c.14-2.12-14.71-164.59,11.97-234.48,7.01-18.36,41.9,7.85,57.76-35.68Z" /></g><g><path style={{fill: 'url(#ac)'}} d="M212.86,500.89l8.98,31.12s-3.3,10.51-20.97,10.46c-17.68-.05-21.18-10.93-21.18-10.93l9.38-29.9,23.8-.74Z" /><path style={{fill: 'url(#ad)'}} d="M200.9,531.62c16.6,0,20.97-4.48,20.97-4.48v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,4.48,20.64,4.48Z" /><path style={{fill: 'url(#ae)'}} d="M180.42,184.58s-.02-17.57,0-20.15,14.01-38.61,16.18-44.26,6.7-5.39,8.75,0c2.05,5.39,16.68,41.99,16.68,43.93s-.04,330.65,0,333.41,8.09,17.79,8.09,19.32,1.69,20.06-29.06,20.06-29.06-18.5-29.06-20.06,8.13-16.64,8.26-19.32,.17-312.94,.17-312.94Z" /><g><path style={{fill: 'url(#af)'}} d="M201.06,468.29c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ag)'}} d="M201.06,475.89c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ah)'}} d="M201.06,484.97c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ai)'}} d="M201.06,496.78c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#aj)'}} d="M201.07,390.34c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ak)'}} d="M201.07,447.98c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#al)'}} d="M201.07,315.12c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#am)'}} d="M201.07,239.82c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#an)'}} d="M201.07,203.16c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ao)'}} d="M201.07,176.08c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /><path style={{fill: 'url(#ap)'}} d="M201.06,507.47c16.6,0,20.97-11.97,20.97-11.97v3.39s-3.88,11.81-20.97,11.81-20.64-11.23-20.64-11.23v-3.96s4.05,11.97,20.64,11.97Z" /></g><path style={{fill: 'url(#aq)'}} d="M180.42,184.58s-.02-17.57,0-20.15c.01-1.29,2.64,11.56,20.81,11.56s20.81-12.86,20.81-11.89c0,1.94-.04,330.65,0,333.41,.02,1.36-3.06,13.05-20.97,13.05s-20.87-11.69-20.81-13.05c.12-2.68,.17-312.94,.17-312.94Z" /><path style={{fill: 'url(#ar)'}} d="M201.06,536.9c32.61,0,29.06-20.06,29.06-20.06l-8.1-18.08s-2.39,11.81-20.97,11.81-20.81-13.05-20.81-13.05l-8.26,19.32s-3.55,20.06,29.06,20.06Z" /><path style={{fill: 'url(#as)'}} d="M180.42,164.44s4.18,11.56,20.81,11.56,20.81-11.89,20.81-11.89c0,0-14.86-40.33-17.12-44.93s-6.38-3.6-7.87,0-16.63,45.27-16.63,45.27Z" /></g><g><path style={{fill: 'url(#at)'}} d="M32.69,439.07c-.14,2.86-2.97,10.79,15.3,12.66,17.94,1.43,19.6-8.7,19.6-8.7,0,0,3.28-21.39,3.85-27.96,.39-4.44-.33-10.13-1.07-16.32-.71-2.13-18.48-13.36-19.51-13.29-7.93,.55-10.9,6.5-12.66,10.9-1.45,3.62-5.38,39.85-5.51,42.72Z" /><path style={{fill: 'url(#au)'}} d="M106.84,454.41l3.26,19.01s-2.53,3.14-13.76,1.82-12.99-5.17-12.99-5.17l8.31-16.95,15.18,1.3Z" /><path style={{fill: 'url(#av)'}} d="M76.16,454.7l-1.28,20.7s-3.42,2.66-14.85-1.5-12.31-8.62-12.31-8.62l12.88-15.68,15.56,5.11Z" /><path style={{fill: 'url(#aw)'}} d="M81.49,464.75l.92,10.27s-1.48,1.56-7.41,.37c-5.93-1.19-6.7-3.32-6.7-3.32l5.16-8.67,8.03,1.35Z" /><path style={{fill: 'url(#ax)', filter: 'url(#ay)', stroke: '#2b2b2b', strokeMiterlimit: 10, strokeWidth: 2}} d="M185.62,458.89l-94.24-40.73L18.5,351.66l-1.1-9.25,5.94-20.7,39.85-24,17.39-81.03s3.55-39.08,22.06-40.18,23.1,49.89,23.1,49.89l14.51,118.44,40.51,77.5,4.84,24.44v12.11Z" /><line style={{fill: 'none', stroke: '#2b2b2b', strokeMiterlimit: 10, strokeWidth: '.75px'}} y2="426.74" x2="126.39" y1="448.76" x1="183.2" /><line style={{fill: 'none', stroke: '#2b2b2b', strokeMiterlimit: 10, strokeWidth: '.75px'}} y2="342.41" x2="17.4" y1="368.13" x1="51.09" /><text style={{fill: '#333', fontSize: '12.27px'}} transform="translate(27.32 341.67) rotate(34.86) scale(1.05 .83) skewX(27.74)"><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700, letterSpacing: '0em'}} y={0} x={0}>U</tspan><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700}} y={0} x="7.92">I</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="11.3">V</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="18.56">E</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '-.02em'}} y={0} x="25.89">R</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="33.65">S</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="41.08">E</tspan></text><path style={{fill: 'url(#ba)'}} d="M123.31,450.69s-12.22,5.01-20.31,5.45-27.69-1.87-36.99-3.63-18.17-7.27-18.17-7.27l-1.49-30.72,2.31-34.68s6.39-114.92,6.88-121.36,.41-18.29,1.21-25.12,8.31-31.4,9.06-32.72,3.66-3.44,3.66-3.44l9.08-22.79s1.32-1.93,7.27-9.41c3.07-3.87,8.37-10.11,13.21-10.4,4.52-.27,8.82,5.09,10.4,7.6,2.52,4,3.28,5.35,4.36,7.99s11.06,32.96,11.99,43.03,4.46,120.55,4.46,120.55l-6.94,116.92Z" /><path style={{fill: 'url(#bb)'}} d="M123.31,450.69s-12.22,5.01-20.31,5.45c-8.09,.44-27.69-1.87-36.99-3.63s-18.17-7.27-18.17-7.27l-1.49-30.72,2.31-34.68s6.39-114.92,6.88-121.36,.41-18.29,1.21-25.12,8.31-31.4,9.06-32.72,3.66-3.44,3.66-3.44l9.08-22.79s1.32-1.93,7.27-9.41c3.07-3.87,8.37-10.11,13.21-10.4,4.52-.27,8.82,5.09,10.4,7.6,2.52,4,3.28,5.35,4.36,7.99s11.06,32.96,11.99,43.03,4.46,120.55,4.46,120.55l-6.94,116.92Z" /><polygon style={{fill: 'url(#bc)', stroke: '#4c4c4c', strokeMiterlimit: 10}} points="56.81 407.75 49.88 415.51 1.82 501.05 .5 504.69 .5 524.34 51.53 472.32 58.96 448.54 61.77 408.41 56.81 407.75" /><polygon style={{fill: 'url(#bd)', stroke: '#5b5b5b', strokeMiterlimit: 10}} points="48.05 475.95 51.28 458.33 52.01 454.37 51.64 456.37 14.76 500.65 9.73 506.09 8.49 516.23 9.9 515.12 48.05 475.95" /><path style={{fill: 'url(#be)'}} d="M78.06,232.21c1.17,1.37-.73,7.04,.83,8.64,3.18,3.27,9.84,2.28,9.98,1.98,3.28-6.94,1.14-17.53-1.04-22.1s-7.68-9.41-7.95-9.55-3.12-3.98-3.3-4.07c-.5-.25-3.22,.25-3.22,.25,0,0-7.14,3.92-8.02,4.71-4.79,4.29-6.89,12.07-6.32,11.13,.51-.84,6.87-3.31,10.71-2.96,.76,.07,6.91,10.31,8.34,11.97Z" /><path style={{fill: 'none', stroke: '#777574', strokeMiterlimit: 10, strokeWidth: '.75px'}} d="M78.27,248.23c.82-.21,3.44,1.21,6.65,1.57,4.12,.46,9.01-.06,9.99,.21,3.56,.95,3.3,8.34-.91,10.07-.87,.36-5.26,1-9.29,.7-3.3-.25-6.42-1.71-7.27-2.39-2.57-2.09-1.76-9.49,.83-10.16Z" /><text style={{fill: '#666', fontFamily: 'Bahnschrift, Bahnschrift', fontSize: '5.69px', fontVariationSettings: '"wght" 400, "wdth" 100'}} transform="translate(121.16 383.28) rotate(28.29) scale(1.26 .89) skewX(19.94)"><tspan y={0} x={0}>@ken</tspan><tspan style={{letterSpacing: '-.01em'}} y={0} x="14.3">n</tspan><tspan style={{letterSpacing: '0em'}} y={0} x="17.4">y</tspan><tspan style={{letterSpacing: '0em'}} y={0} x="20.09">otsu</tspan></text><text style={{fill: '#333', fontSize: '12.31px'}} transform="translate(120.21 399.04) rotate(28.29) scale(.98 .89) skewX(24.96)"><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700, letterSpacing: '0em'}} y={0} x={0}>U</tspan><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700}} y={0} x="7.95">I</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="11.33">V</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="18.62">E</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '-.02em'}} y={0} x="25.98">R</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="33.76">S</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="41.22">E</tspan></text><polygon style={{fill: 'url(#bf)', opacity: '.82'}} points="122.02 377.86 133.5 384.43 133.77 377.45 122.02 370.93 122.02 377.86" /><path style={{fill: 'url(#bg)'}} d="M61.77,455.26c-.14,2.86-2.97,10.79,15.3,12.66,17.94,1.43,19.6-8.7,19.6-8.7,0,0,3.28-21.39,3.85-27.96,.39-4.44-.33-10.13-1.07-16.32-.71-2.13-3.14-3.64-4.16-3.45-3.11,.57-17.2,2.93-20.86,4.28s-9.03,9.77-9.03,9.77c0,0-3.5,26.86-3.63,29.72Z" /><path style={{fill: 'url(#bh)'}} d="M99.03,154.6c15.8,0,23.06,42.39,25.97,53.78,.59,3.25,2.05,16.9,2.05,16.9,0,0-16.95-10.91-19.38-28.19s-12.66-23.72-18.17-24.39-13.29,7.56-13.29,7.56c0,0,.61-2.93,2.33-5.85,4.4-7.46,13.63-19.82,20.48-19.82Z" /><text style={{fill: '#333', fontSize: '12.31px'}} transform="translate(112.43 320.11) rotate(-88.85) scale(.98) skewX(13.92)"><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700, letterSpacing: '0em'}} y={0} x={0}>U</tspan><tspan style={{fontFamily: 'Bahnschrift-Bold, Bahnschrift', fontVariationSettings: '"wght" 700, "wdth" 100', fontWeight: 700}} y={0} x="7.95">I</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="11.33">V</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="18.62">E</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '-.02em'}} y={0} x="25.98">R</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100', letterSpacing: '0em'}} y={0} x="33.76">S</tspan><tspan style={{fontFamily: 'Bahnschrift, Bahnschrift', fontVariationSettings: '"wght" 400, "wdth" 100'}} y={0} x="41.22">E</tspan></text><path style={{fill: 'url(#bi)'}} d="M61.77,455.26c-.14,2.86-2.97,10.79,15.3,12.66,17.94,1.43,19.6-8.7,19.6-8.7,0,0,3.28-21.39,3.85-27.96,.39-4.44-.33-10.13-1.07-16.32-.71-2.13-3.14-3.64-4.16-3.45-3.11,.57-17.2,2.93-20.86,4.28s-9.03,9.77-9.03,9.77c0,0-3.5,26.86-3.63,29.72Z" /><line style={{fill: '#fff', stroke: '#2b2b2b', strokeMiterlimit: 10, strokeWidth: '.5px'}} y2="426.74" x2="126.39" y1="432.01" x1="124.42" /><path style={{fill: 'url(#bj)'}} d="M91.12,170.73c2.47,.54,5.71-8.54,3.35-8.72s-5.82,8.18-3.35,8.72Z" /><path style={{fill: 'url(#bk)'}} d="M86.98,171.58c1.41,.66,4.25-6.41,2.87-6.77s-4.28,6.1-2.87,6.77Z" /><path style={{fill: 'url(#bl)'}} d="M94.44,172.88c2.08,.44,4.88-6.87,2.88-7.01s-4.96,6.57-2.88,7.01Z" /></g></g></svg>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* overengeneered pure css action button */
  /* UIVERSE CSS Challenge entry */
  /* by kennyotsu <3 */

  /* container wraps everything together, applies general styles and does nothing else*/
  .container {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 200px;
    height: 200px;
    color: rgb(131, 131, 131);
    -webkit-transition: 400ms ease-in-out;
    transition: 400ms ease-in-out;
    transform: translateY(20px);
  }

    /* clickHandler, as the name suggests, handles clicks. 
  	 Its a label for invisible checkbox, positioned absolutely and taking whole container space.
  	 Comes with insane z-index. Stays above .container
  	 When clicked, will change input state to checked */
  #shuttle-wrapper {
    position: absolute;
    opacity: 0;
    -webkit-transition: 200ms ease-in;
    transition: 200ms ease-in;
    z-index: 200;
  }

  #b {
    width: 80px;
    height: auto;
    z-index: 200;
  }

  #shadow {
    position: absolute;
    width: 100px;
    height: 80px;
    -webkit-transform: rotateX(45deg) rotateZ(45deg);
    transform: rotateX(45deg) rotateZ(45deg);
    bottom: -10px;
    z-index: -1;
    background: radial-gradient(rgba(0, 0, 0, 0.382) 0%, rgba(0, 0, 0, 0) 70%);
  }

  #clickHandler {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 999;
  }

  #clickHandler:hover {
    cursor: pointer;
  }

  .container:hover #shuttle-wrapper {
    opacity: 1;
    -webkit-transform: translateY(-100px) translateZ(140px);
    -ms-transform: translateY(-100px) translateZ(140px);
    transform: translateY(-100px) translateZ(140px);
    -webkit-transition: 400ms ease-in-out;
    transition: 400ms ease-in-out;
  }

  #checkbox {
  	/* comment out to actually see the checkbox state */
    display: none;
  	/*  */
    position: absolute;
    bottom: 0px;
    width: 200px;
  }

    /* this pseudo-selectors will fire animations when 
  	 clickHandler changes checkbox state to checked */
  #checkbox:checked ~ #shuttle-wrapper #b {
    -webkit-animation-name: launch_31;
    animation-name: launch_31;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-duration: 6s;
    animation-duration: 6s;
  }

  #checkbox:checked ~ #shuttle-wrapper #shadow {
    -webkit-animation: shadow-launch 6s ease-in-out;
    animation: shadow-launch 6s ease-in-out;
  }

  #checkbox:checked ~ #to-hover {
    -webkit-animation-name: fadeout_010;
    animation-name: fadeout_010;
    -webkit-animation-duration: 6s;
    animation-duration: 6s;
  }

  #checkbox:checked ~ #button #to-launch {
    -webkit-animation-name: fadeout_010;
    animation-name: fadeout_010;
    -webkit-animation-duration: 6s;
    animation-duration: 6s;
  }
    /* and this will take care of hover */
  #clickHandler:hover ~ #button {
    width: 200px;
    height: 200px;
    -webkit-transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
    transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
    -webkit-box-shadow: 2px 2px 0 2px #b2b2b2, -1px 0 28px 0 rgba(255, 250, 225, 0.512),
    28px 28px 28px 0 rgba(28, 27, 88, 0.315);
    box-shadow: 2px 2px 0 2px #b2b2b2, -1px 0 28px 0 rgba(255, 250, 225, 0.512),
    28px 28px 28px 0 rgba(28, 27, 88, 0.315);
    -webkit-transition-delay: 0ms;
    transition-delay: 0ms;
  }

  .container:hover {
    -webkit-transform: translateY(30%);
    -ms-transform: translateY(30%);
    transform: translateY(30%);
  }

  #to-launch {
    color: rgb(1, 85, 255);
    font-size: large;
    font-weight: bold;
    -webkit-transition: ease-out 200ms;
    transition: ease-out 200ms;
  }

  #to-hover {
    margin-top: 1em;
    text-align: center;
    -webkit-transition: ease-out 200ms;
    transition: ease-out 200ms;
  }

  #tag {
    opacity: 0;
    color: rgb(43, 43, 43);
    position: absolute;
  }

  #platform {
    position: absolute;
    width: 70%;
    height: 0;
    border-radius: 16px;
    background-color: rgb(234, 234, 234);
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
    -webkit-transition-delay: 150ms;
    transition-delay: 150ms;
    border: solid 0px rgba(42, 42, 42, 0);
    outline: dashed rgba(255, 173, 57, 0);
    -moz-outline-radius: 16px;
    outline-width: 0px;
    outline-offset: 0px;
  }

  #clickHandler:hover ~ #button #platform {
    height: 70%;
    background: rgb(244, 244, 244);
    border: solid 4px rgb(42, 42, 42);
    outline: dashed rgb(255, 172, 57);
    outline-width: 4px;
    outline-offset: -4px;
    -webkit-animation: shake_010 80ms infinite;
    animation: shake_010 80ms infinite;
  }

  .caution {
    -webkit-transform: translateY(-200);
    -ms-transform: translateY(-200);
    transform: translateY(-200);
    position: absolute;
    width: 100%;
    text-align: center;
  }

  #checkbox:checked ~ .caution {
    -webkit-animation-name: fadeout_010;
    animation-name: fadeout_010;
    -webkit-animation-duration: 6s;
    animation-duration: 6s;
  }

  #caution-left {
    -webkit-transition: 200ms ease;
    transition: 200ms ease;
    opacity: 0;
    -webkit-transform: translate3d(83px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(-90deg);
    transform: translate3d(83px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(-90deg);
  }

  #caution-right {
    -webkit-transition: 200ms ease;
    transition: 200ms ease;
    opacity: 0;
    -webkit-transform: translate3d(0px, 62px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: translate3d(0px, 62px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  #clickHandler:hover ~ #button .caution #caution-left {
    opacity: 1;
    -webkit-transition: 400ms ease-in;
    transition: 400ms ease-in;
    animation: glow_010 1.2s infinite;
  }

  #clickHandler:hover ~ #button .caution #caution-right {
    opacity: 1;
    -webkit-transition: 400ms ease-in;
    transition: 400ms ease-in;
    animation: glow_010 1.2s infinite;
  }

  #button {
    width: 200px;
    height: 80px;
    border: none;
    border-radius: 1.8rem;
    -webkit-transition: 0.4s ease-in-out;
    transition: 0.4s ease-in-out;
    -webkit-box-shadow: 5px 5px 8px 0 rgba(28, 27, 88, 0.315);
    box-shadow: 5px 5px 8px 0 rgba(28, 27, 88, 0.315);
    background: -webkit-gradient(linear, left top, right top, from(#ffffff), to(#ececec));
    background: linear-gradient(125deg, #ffffff 50%, #f5f5ff);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: inherit;
    -webkit-transition-delay: 100ms;
    transition-delay: 100ms;
  }

  #clickHandler:hover ~ #button #to-launch {
    opacity: 0;
  }

  #clickHandler:hover ~ #to-hover {
    opacity: 0;
  }

  #checkbox:checked ~ #button #tag {
    -webkit-animation: tag-transition 5s ease-in-out;
    animation: tag-transition 5s ease-in-out;
  }

    /* launch sequence, takes only 20% of duration to completely fade out,
  	 and stays there til 90% */

  @keyframes launch_31 {
    5% {
      opacity: 1;
    }

    15%, 90% {
      -webkit-transform: translateY(-200px);
      transform: translateY(-200px);
      -webkit-transition-timing-function: ease-in;
      transition-timing-function: ease-in;
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes shadow-launch {
    0% {
      opacity: 1;
    }

    10%, 90% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeout_010 {
    100% {
      opacity: 1;
    }

    0%, 20%, 90% {
      opacity: 0;
    }
  }

  @keyframes shake_010 {
    0%, 50% {
      -webkit-transform: translate3d(1px, 0px, 0px);
      transform: translate3d(1px, 0px, 0px);
    }

    100% {
      -webkit-transform: translate3d(0px, 1px, 0px);
      transform: translate3d(0px, 1px, 0px);
    }
  }

  @keyframes glow_010 {
    0% {
      color: rgb(94, 94, 94);
      -webkit-filter: drop-shadow(0 0 0.75rem rgb(255, 214, 90));
      filter: drop-shadow(0 0 0.75rem rgb(255, 214, 90));
    }

    70% {
      color: rgba(255, 255, 255, 0);
    }

    100% {
      color: rgb(94, 94, 94);
      -webkit-filter: drop-shadow(0 0 0.75rem rgb(255, 214, 90));
      filter: drop-shadow(0 0 0.75rem rgb(255, 214, 90));
    }
  }

  @keyframes tag-transition {
    0%, 100% {
      opacity: 0;
    }

    20%, 80% {
      opacity: 1;
    }
  }

  .noselect {
    -webkit-touch-callout: none;
     /* iOS Safari */
    -webkit-user-select: none;
     /* Safari */
     /* Konqueror HTML */
    -moz-user-select: none;
     /* Old versions of Firefox */
    -ms-user-select: none;
     /* Internet Explorer/Edge */
    user-select: none;
     /* Non-prefixed version, currently
  									supported by Chrome, Edge, Opera and Firefox */
  }`;

export default Button;
