import test from 'node:test';
import assert from 'node:assert/strict';
import { scenario, matchingRelationships } from '../lib/articles/nvidia-model.ts';
test('baseline indexes revenue to 100 and operating profit to 60',()=>{const r=scenario(0,85,75);assert.equal(r.revenue,100);assert.equal(r.profit,60);assert.equal(r.profitMultiple,1)});
test('growing market offsets share loss while margin compression weakens profit',()=>{const r=scenario(20,60,65);assert.ok(Math.abs(r.revenue-146.37176470588236)<1e-8);assert.ok(r.profitMultiple>1);assert.ok(scenario(20,60,75).profit>r.profit);assert.ok(scenario(0,60,75).revenue<100)});
test('operating costs can make a growing revenue scenario less profitable',()=>{assert.ok(scenario(20,60,65,22).profit<scenario(20,60,65,15).profit);assert.equal(scenario(0,85,0,15).profit,-15)});
test('inputs reject nonfinite and impossible assumptions',()=>{for(const args of [[NaN,85,75],[10,101,75],[10,85,-1],[-101,85,75],[10,85,75,101]])assert.throws(()=>scenario(...args),RangeError)});
test('relationship filtering combines company and type',()=>{const rows=[{from:'A',to:'B',kind:'equity'},{from:'B',to:'C',kind:'loan'}];assert.equal(matchingRelationships(rows,'B','all').length,2);assert.equal(matchingRelationships(rows,'A','loan').length,0);assert.equal(matchingRelationships(rows,'all','loan')[0].to,'C')});

const { chipEconomics, aiSchedule } = await import('../lib/articles/nvidia-model.ts');
test('yield affects wafer cost and volume amortizes fixed development spending',()=>{const r=chipEconomics(20000,80,70,400,500,500000);assert.ok(Math.abs(r.variableCost-757.1428571428571)<1e-8);assert.equal(r.designPerUnit,1000);assert.ok(chipEconomics(20000,80,90,400,500,500000).totalCost<r.totalCost);assert.ok(chipEconomics(20000,80,70,400,500,1000000).totalCost<r.totalCost)});
test('AI accelerates eligible work only, with a ceiling set by the remainder',()=>{const r=aiSchedule(12,8,2);assert.equal(r.before,20);assert.equal(r.after,14);assert.equal(r.saved,6);assert.equal(aiSchedule(12,8,1).saved,0);assert.equal(aiSchedule(0,8,100).after,8);assert.ok(aiSchedule(12,8,100).after>8)});
test('economics and schedule reject zero denominators and invalid inputs',()=>{for(const args of [[20000,80,0,400,500,500000],[20000,0,70,400,500,500000],[20000,80,70,400,500,0],[20000,80,101,400,500,500000]])assert.throws(()=>chipEconomics(...args),RangeError);assert.throws(()=>aiSchedule(12,8,0),RangeError);assert.throws(()=>aiSchedule(-1,8,2),RangeError)});
