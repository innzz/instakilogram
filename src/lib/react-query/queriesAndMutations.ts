import { INewPost, INewUser, IUpdatePost } from '@/types'

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
  } from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getSavedPosts, getUsers, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}


export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getUsers
  })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}


//////////////////// POST
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

export const useGetRecentPosts = ()=>{
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
      initialPageParam: "",
      getNextPageParam: (lastPage)=> {
        if (lastPage && lastPage.documents.length === 0) return null;

        const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
  
        return lastId;
      }
    })
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({postId,likesArray}:{postId: string, likesArray: string[]}) => likePost(postId,likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,data?.$id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
    },
  });
};


export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({postId,userId}:{postId: string, userId: string}) => savePost(postId,userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,data?.$id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
    },
  });
};


export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (saveRecordId: string) => deleteSavedPost(saveRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      })
    },
  });
};


export const useGetPostById = (postId: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: ({queryKey}: {queryKey: string[]})=> getPostById(queryKey),
    //refetch only if the postid changes
    enabled: !!postId
  })
}


export const useUpdatePostById = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost)=> updatePost(post),
    onSuccess: (data)=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}


export const useDeletePostById = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({postId,imageId}:{postId: string, imageId: string})=> deletePost(postId,imageId),
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}


export const useGetPosts = ()=>{
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) return null;

      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

      return lastId;
    }
  })
}


export const useSearchPosts = (searchTerm: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: ()=> searchPosts(searchTerm),
    enabled: !!searchTerm
  })
}

export const useGetSavedPosts = (userId: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId],
    queryFn: ()=> getSavedPosts(userId),
  })
}