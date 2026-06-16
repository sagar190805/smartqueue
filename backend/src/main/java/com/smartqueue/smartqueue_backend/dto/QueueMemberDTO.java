package com.smartqueue.smartqueue_backend.dto;
public class QueueMemberDTO {
    private int position;
    private String userId,name,email;
    public QueueMemberDTO(){}
    public QueueMemberDTO(int p,String uid,String n,String e){position=p;userId=uid;name=n;email=e;}
    public int getPosition(){return position;} public void setPosition(int v){position=v;}
    public String getUserId(){return userId;} public void setUserId(String v){userId=v;}
    public String getName(){return name;} public void setName(String v){name=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;}
}
