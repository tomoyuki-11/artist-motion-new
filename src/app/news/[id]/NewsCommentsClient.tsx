"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitNewsComment } from "@/lib/adminApi";
import type { NewsCommentItem } from "@/lib/adminApi";
import { useState } from "react";
import { toast } from "sonner";

export function NewsCommentsClient({
  newsId,
  initialComments,
}: {
  newsId: string;
  initialComments: NewsCommentItem[];
}) {
  const [comments, setComments] = useState<NewsCommentItem[]>(initialComments);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentSending, setCommentSending] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">
        コメント（{comments.length}件）
      </h4>
      <ul className="list-none m-0 p-0 space-y-3 mb-4">
        {comments.map((c) => (
          <li key={c.id} className="bg-slate-50 rounded-lg p-3 text-sm">
            <p className="font-medium text-slate-800 mb-1">{c.author_name}</p>
            <p className="text-slate-600 whitespace-pre-wrap">{c.body}</p>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(c.created_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (commentSending || !commentAuthor.trim() || !commentBody.trim()) return;
          setCommentSending(true);
          try {
            const newComment = await submitNewsComment(newsId, {
              author_name: commentAuthor,
              body: commentBody,
            });
            setComments((prev) => [...prev, newComment]);
            setCommentAuthor("");
            setCommentBody("");
            toast.success("コメントを送信しました");
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "送信に失敗しました");
          } finally {
            setCommentSending(false);
          }
        }}
        className="space-y-3"
      >
        <div>
          <Label htmlFor="comment-author" className="text-slate-700">
            お名前
          </Label>
          <Input
            id="comment-author"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            placeholder="ニックネーム可"
            className="mt-1"
            maxLength={100}
          />
        </div>
        <div>
          <Label htmlFor="comment-body" className="text-slate-700">
            コメント
          </Label>
          <Textarea
            id="comment-body"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="メッセージをどうぞ"
            className="mt-1 min-h-[80px]"
            maxLength={2000}
          />
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
          <Button
            type="submit"
            disabled={commentSending || !commentAuthor.trim() || !commentBody.trim()}
          >
            {commentSending ? "送信中…" : "コメントを送信"}
          </Button>
          <p className="text-xs text-slate-500">
            ※一度送信したコメントは削除できません。
          </p>
        </div>
      </form>
    </div>
  );
}
