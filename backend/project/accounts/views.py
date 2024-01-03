from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.generics import get_object_or_404, RetrieveAPIView, CreateAPIView

from .serializers import UserSerializer, SignUpSerializer


class SignupUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [permissions.AllowAny]


class IsSelfOrAdmin(permissions.BasePermission):
    """
        Custom Permission for user being self or admin.
    """

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return request.user and obj == request.user


class UserProfileView(RetrieveAPIView):
    lookup_field = "username"
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsSelfOrAdmin, permissions.IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, username=self.request.user.username)
        return obj
