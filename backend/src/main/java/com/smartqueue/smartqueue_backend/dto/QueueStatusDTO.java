package com.smartqueue.smartqueue_backend.dto;
public class QueueStatusDTO {
    private String workplaceId,sessionName;
    private int currentToken,queueSize;
    private boolean active;
    public QueueStatusDTO(){}
    public QueueStatusDTO(String wId,int ct,int qs,boolean a,String sn){
        workplaceId=wId;currentToken=ct;queueSize=qs;active=a;sessionName=sn;
    }
    public String getWorkplaceId(){return workplaceId;} public void setWorkplaceId(String v){workplaceId=v;}
    public String getSessionName(){return sessionName;} public void setSessionName(String v){sessionName=v;}
    public int getCurrentToken(){return currentToken;} public void setCurrentToken(int v){currentToken=v;}
    public int getQueueSize(){return queueSize;} public void setQueueSize(int v){queueSize=v;}
    public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
}
