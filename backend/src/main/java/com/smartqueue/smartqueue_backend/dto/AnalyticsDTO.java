package com.smartqueue.smartqueue_backend.dto;
public class AnalyticsDTO {
    private long totalServed;
    private double avgWaitSeconds;
    private int currentQueueSize,currentToken;
    private String sessionName;
    private boolean sessionActive;
    public AnalyticsDTO(){}
    public AnalyticsDTO(long ts,double aw,int cqs,int ct,String sn,boolean sa){
        totalServed=ts;avgWaitSeconds=aw;currentQueueSize=cqs;currentToken=ct;sessionName=sn;sessionActive=sa;
    }
    public long getTotalServed(){return totalServed;} public void setTotalServed(long v){totalServed=v;}
    public double getAvgWaitSeconds(){return avgWaitSeconds;} public void setAvgWaitSeconds(double v){avgWaitSeconds=v;}
    public int getCurrentQueueSize(){return currentQueueSize;} public void setCurrentQueueSize(int v){currentQueueSize=v;}
    public int getCurrentToken(){return currentToken;} public void setCurrentToken(int v){currentToken=v;}
    public String getSessionName(){return sessionName;} public void setSessionName(String v){sessionName=v;}
    public boolean isSessionActive(){return sessionActive;} public void setSessionActive(boolean v){sessionActive=v;}
}
