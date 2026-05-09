DROP POLICY IF EXISTS "users update own care files" ON storage.objects;
CREATE POLICY "users update own care files" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'care-record-files' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (bucket_id = 'care-record-files' AND auth.uid()::text = (storage.foldername(name))[1]);