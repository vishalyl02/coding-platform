class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
     vector<int>pfx(nums.size()),sfx(nums.size());
     vector<int>res(nums.size());
       for(int i=0;i<nums.size();i++)
       {if(i==0)
        pfx[i]=nums[0];
        else
        pfx[i]=nums[i]*pfx[i-1];
       } for(int i=nums.size()-1;i>=0;i--)
       {
        if(i==nums.size()-1)
        sfx[i]=nums[i];
        else
        { sfx[i]=sfx[i+1]*nums[i];
        }}
       for(int i=0;i<nums.size();i++)
       { if(i==0)
        {   res[i]=sfx[i+1];
            continue;}
        if(i==nums.size()-1)
        res[i]=pfx[i-1];
        else
        res[i]=sfx[i+1]*pfx[i-1];
       }
       return res;}};