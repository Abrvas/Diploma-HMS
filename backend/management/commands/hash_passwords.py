from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from backend.models import Staff_user

class Command(BaseCommand):
    help = 'Хеширует все существующие пароли'

    def handle(self, *args, **options):
        users = Staff_user.objects.all()
        count = 0
        skipped = 0
        
        for user in users:
            # Проверяем наличие пароля
            if not user.password:
                self.stdout.write(
                    self.style.WARNING(f'Пропущен пользователь {user.id}: пароль отсутствует')
                )
                skipped += 1
                continue
                
            # Проверяем, не захеширован ли уже пароль
            if not user.password.startswith('pbkdf2_sha256$'):
                try:
                    raw_password = user.password
                    user.password = make_password(raw_password)
                    user.save()
                    count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f'Захеширован пароль для пользователя {user.id}')
                    )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'Ошибка при хешировании пароля для пользователя {user.id}: {str(e)}')
                    )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Операция завершена:\n'
                f'- Успешно захешировано: {count} паролей\n'
                f'- Пропущено: {skipped} пользователей'
            )
        )